---
title: 机械革命键盘在 linux 下无效的问题
published: 2026-08-26
description: 关于机械革命笔记本内置键盘在 archlinux 下无效的问题解决
image: ''
tags: [linux]
category: linux 生存日记
draft: false
lang: zh
---

## 根本原因

具体而言，该机型 BIOS 中的 DSDT 表将键盘控制器的中断描述错误地标记为「边缘敏感、低电平有效（Edge ActiveLow）」，而实际硬件设计应为「边缘敏感、高电平有效（Edge ActiveHigh）」。

在旧版 Linux 内核中，系统存在一种「兜底机制」：当检测到边缘敏感且低电平有效的键盘中断时，内核会默认判定这是 BIOS 的 Bug，并强制将其覆盖为高电平有效。这一机制恰好掩盖了蛟龙 16K 的 BIOS 缺陷，使其键盘得以正常工作。

然而，随着 Linux 内核引入了 `ACPI: skip IRQ override on AMD Zen platforms` 补丁，内核取消了对 AMD 锐龙平台的这种特殊干预。该补丁的初衷是为了解决部分锐龙笔记本因键盘本身确为低电平有效，却被内核强行覆盖导致失灵的问题。但这一「拨乱反正」的举措，却意外地让蛟龙 16K 的 BIOS 缺陷彻底暴露：由于内核不再进行强制修正，系统开始严格遵循 BIOS 中错误的低电平描述，最终导致键盘控制器无法正确响应按键中断，从而引发系统级的键盘失灵。

## 解决方法

### 第一步：确定启动项目与启动方式

```bash
sudo bootctl list
```

你会看到类似这样的输出：

```
type: Boot Loader Specification Type #1 (.conf)
        title: Arch Linux (default) (selected)
           id: 43bd23b8f86a41d883e963cd08a9b1cc-7.1.8-arch1-3.conf
       source: /boot//loader/entries/43bd23b8f86a41d883e963cd08a9b1cc-7.1.8-arch1-3.conf (on the EFI System Partition)
     sort-key: arch
      version: 7.1.8-arch1-3
   machine-id: 43bd23b8f86a41d883e963cd08a9b1cc
        linux: /boot//43bd23b8f86a41d883e963cd08a9b1cc/7.1.8-arch1-3/linux
       initrd: /boot//acpi_override
               /boot//43bd23b8f86a41d883e963cd08a9b1cc/7.1.8-arch1-3/initrd
      options: root=PARTUUID=2007486f-aa7e-4e58-b00f-ba975af4185f zswap.enabled=0 rw rootfstype=ext4 systemd.machine_id=43bd23b8f86a41d883e963cd08a9b1cc
        extra: /boot//loader/credentials/nvpcr-anchor.43bd23b8f86a41d883e963cd08a9b1cc.cred

         type: Automatic
        title: Reboot Into Firmware Interface
           id: auto-reboot-to-firmware-setup
       source: /sys/firmware/efi/efivars/LoaderEntries-4a67b082-0a4c-41cf-b6c7-440b29bb8c4f (on the EFI System Partition)
```
确认你的条目类型是 **Type #1 (.conf)**。如果你看到的是 Type #2 (UKI, `.efi`)，本文不适用，需要先切换到 `.conf` 方式：
1. 重新生成所有内核条目：
   ```bash
   sudo reinstall-kernels
   ```
2. 清理旧的 UKI 文件：
   ```bash
   sudo rm -f /boot/EFI/Linux/*.efi
   ```
3. 再次执行 `sudo bootctl list`，确认条目已变成 Type #1 (.conf) 后，再回到本文第一步继续。

### 第二步：安装必要工具

Arch Linux 下执行：

```bash
sudo pacman -S acpica cpio
```

- **acpica**：提供 `iasl` 工具，用于反编译/编译 ACPI 表
- **cpio**：用于打包成内核能识别的格式

### 第三步：提取并反编译 DSDT

在家目录下创建一个工作文件夹（方便管理）：

```bash
mkdir ~/dsdt-fix && cd ~/dsdt-fix
```

提取当前系统的 DSDT 表：

```bash
sudo cat /sys/firmware/acpi/tables/DSDT > dsdt.dat
```

反编译成可编辑的文本文件：

```bash
iasl -d dsdt.dat
```

执行后会生成 `dsdt.dsl`。这就是我们要修改的「BIOS 配置脚本」。

### 第四步：修改 DSDT（核心步骤）

用你熟悉的编辑器打开 `dsdt.dsl`。这里以 nano 为例：

```bash
nano dsdt.dsl
```

#### 修改点 1：修正键盘中断极性

按 `Ctrl+W` 搜索 `Device (PS2K)`，找到键盘设备的定义块。向下找几行，你会看到类似这样的代码：

```asl
IRQ (Edge, ActiveLow, Shared, )
    {1}
```

把 `ActiveLow` 改成 `ActiveHigh`：

```asl
IRQ (Edge, ActiveHigh, Shared, )
    {1}
```

> ⚠️ 只改 PS2K 下面的第一个 `ActiveLow`，不要全文替换，其他地方可能真的是 `ActiveLow`。

#### 修改点 2：提升 DSDT 版本号

再搜索 `DefinitionBlock`，找到文件最开头类似这样的一行：

```asl
DefinitionBlock ("", "DSDT", 2, "ALASKA", "A M I ", 0x01072009)
```

把最后的十六进制版本号加 1：

```asl
DefinitionBlock ("", "DSDT", 2, "ALASKA", "A M I ", 0x0107200A)
```

> 这一步至关重要。如果版本号不变，内核会忽略你的修改，仍然使用 BIOS 自带的旧表。

改完后保存退出（nano 按 `Ctrl+O` 回车保存，`Ctrl+X` 退出）。

### 第五步：编译并打包

#### 5.1 编译回 AML 格式

```bash
iasl dsdt.dsl
```

如果看到 `Compilation successful. 0 Errors`，说明编译通过，会生成 `dsdt.aml`。

如果有警告（Warnings），通常可以忽略；如果有错误（Errors），请检查上一步的修改是否多了或少了括号。

#### 5.2 打包成 CPIO 格式

内核在启动时会从 initrd 中查找 `kernel/firmware/acpi/dsdt.aml` 这个固定路径来加载覆盖表。我们需要按这个结构打包：

```bash
mkdir -p kernel/firmware/acpi
cp dsdt.aml kernel/firmware/acpi/
find kernel | cpio -H newc --create > acpi_override
```

现在当前目录下会生成一个名为 `acpi_override` 的文件。

#### 5.3 复制到 /boot

```bash
sudo cp acpi_override /boot/
```

### 第六步：配置 systemd-boot 加载它

假设你的启动条目文件是 `/boot/loader/entries/arch-linux.conf`（文件名可能不同，以你的为准）。先看一下现有内容：

```bash
sudo cat /boot/loader/entries/arch-linux.conf
```

典型的内容长这样：

```ini
# Boot Loader Specification type#1 entry
# File created by /usr/lib/kernel/install.d/90-loaderentry.install (systemd 261.2-1-arch)
title      Arch Linux
version    7.1.8-arch1-3
machine-id 43bd23b8f86a41d883e963cd08a9b1cc
sort-key   arch
options    root=PARTUUID=2007486f-aa7e-4e58-b00f-ba975af4185f zswap.enabled=0 rw rootfstype=ext4 systemd.machine_id=43bd23b8f86a41d883e963cd08a9b1cc
linux      /43bd23b8f86a41d883e963cd08a9b1cc/7.1.8-arch1-3/linux
initrd     /43bd23b8f86a41d883e963cd08a9b1cc/7.1.8-arch1-3/initrd
```

关键操作：在 `linux` 下面、原来的 `initrd` 上面，新增一行：

```ini
initrd  /acpi_override
```

修改后应该长这样：

```ini
# Boot Loader Specification type#1 entry
# File created by /usr/lib/kernel/install.d/90-loaderentry.install (systemd 261.2-1-arch)
title      Arch Linux
version    7.1.8-arch1-3
machine-id 43bd23b8f86a41d883e963cd08a9b1cc
sort-key   arch
options    root=PARTUUID=2007486f-aa7e-4e58-b00f-ba975af4185f zswap.enabled=0 rw rootfstype=ext4 systemd.machine_id=43bd23b8f86a41d883e963cd08a9b1cc
linux      /43bd23b8f86a41d883e963cd08a9b1cc/7.1.8-arch1-3/linux
initrd     /acpi_override
initrd     /43bd23b8f86a41d883e963cd08a9b1cc/7.1.8-arch1-3/initrd
```

> 注意：顺序很重要，`acpi_override` 必须在真正的 initramfs 之前加载。因为内核是按顺序解析 initrd 的，ACPI 表需要在早期初始化阶段就被覆盖。

### 第七步：重启并验证

```bash
sudo reboot
```

重启后键盘应该已经能正常响应。

回滚也很简单：删除启动条目里新增的 `initrd /acpi_override` 一行，或恢复备份的原配置文件，重启即可。
