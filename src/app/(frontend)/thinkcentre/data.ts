const IMG =
  'https://raw.githubusercontent.com/BoKKeR/awesome-thinkcentres/master/images' as const

export const PCIE_NETWORKING = [
  {
    name: 'Mellanox ConnectX-3',
    tag: '10G / 40G',
    note: 'Single or dual-port SFP+. Most common 10G choice for homelab. Widely available used.',
    image: `${IMG}/connect3.webp`,
  },
  {
    name: 'Mellanox ConnectX-4 Lx',
    tag: '25G / 100G',
    note: '25G SFP28 or 100G QSFP28. Used in high-throughput clusters where ConnectX-3 bandwidth is a bottleneck.',
    image: `${IMG}/connect4.webp`,
  },
  {
    name: 'Intel X520',
    tag: '10G',
    note: 'Dual-port SFP+. Well-supported in Linux, common in the used market, runs cool.',
    image: `${IMG}/intel520.webp`,
  },
  {
    name: 'Intel X550',
    tag: '10G',
    note: 'RJ45 or SFP+. Higher power draw than X520 — check chassis thermals before installing.',
    image: `${IMG}/intel550.webp`,
  },
  {
    name: 'Intel X710',
    tag: '10G',
    note: 'Good Linux support, lower power draw than X550. Single or dual-port SFP+.',
    image: `${IMG}/intel710.webp`,
  },
  {
    name: 'Intel i350-AM4',
    tag: '1G',
    note: 'Quad-port 1GbE. Good for routing, management networks, or multi-WAN setups.',
    image: `${IMG}/i350-t4.webp`,
  },
] as const

export const PCIE_STORAGE = [
  {
    name: 'Dell PERC H200',
    tag: 'SAS / SATA',
    note: 'Flash to IT firmware for TrueNAS/ZFS passthrough. 8 ports SAS/SATA. Common and cheap used.',
    image: `${IMG}/h200perc.webp`,
  },
  {
    name: 'TISHRIC ASM1166',
    tag: '6× SATA',
    note: 'SATA controller for adding up to 6 drives via the TinyRiser PCIe slot. Good TrueNAS compatibility.',
    image: `${IMG}/tishric.webp`,
  },
] as const

export const PCIE_GPUS = [
  {
    name: 'NVIDIA Quadro K1200',
    tag: 'GPU',
    note: 'Low-profile, 4× Mini DisplayPort, passive-cooled option available. Good for display output.',
    image: `${IMG}/quadro.webp`,
  },
  {
    name: 'NVIDIA T600',
    tag: 'GPU',
    note: 'Low-profile, 4× Mini DP, 40W TDP. Good for light inference workloads.',
    image: `${IMG}/t600.webp`,
  },
  {
    name: 'NVIDIA T1000',
    tag: 'GPU',
    note: 'Low-profile, 4× Mini DP, 50W TDP. Step up from T600 for heavier compute.',
  },
  {
    name: 'NVIDIA RTX A2000',
    tag: 'GPU',
    note: 'Low-profile, 70W TDP. Best compute option for the M920q — CUDA and inference tasks.',
    image: `${IMG}/rtxa2000.webp`,
  },
] as const

export const BUILDS = [
  {
    title: '4-bay NAS',
    tag: 'nas',
    description:
      'DIY 4-bay NAS from an M720q with 3D-printed enclosure and TinyRiser storage expansion.',
    href: 'https://www.reddit.com/r/homelab/comments/1qllfjn/thinkbox_released_diy_4bay_nas_and_powerful/',
    image: `${IMG}/diy4bay.webp`,
  },
  {
    title: '6-bay 10G NAS',
    tag: 'nas',
    description:
      '6-bay NAS with 10GbE networking built from an M720q — drives, NIC, and enclosure walkthrough.',
    href: 'https://www.reddit.com/r/homelab/comments/1sdmgzm/built_a_6bay_10gbps_nas_from_a_lenovo_m720q/',
    image: `${IMG}/6-bay-10gbps-nas.webp`,
  },
  {
    title: 'Kubernetes cluster',
    tag: 'k8s',
    description:
      'Multi-node bare-metal K8s cluster using M920q nodes — hardware selection and cluster setup.',
    href: 'https://blog.zolty.systems/posts/2026-02-07-choosing-the-hardware',
    image: `${IMG}/6bay-homelab.webp`,
  },
  {
    title: 'OPNsense router',
    tag: 'networking',
    description:
      'M720q running OPNsense as a full-featured home router with an Intel NIC installed via TinyRiser.',
    href: 'https://www.reddit.com/r/homelab/comments/1lvnv72/built_a_opnsense_router_from_a_lenovo_m720q_intel/',
    image: `${IMG}/opfsense.webp`,
  },
  {
    title: 'Ceph storage mesh',
    tag: 'storage',
    description:
      '10G Ceph storage mesh across multiple ThinkCentre nodes — distributed block storage for a homelab cluster.',
    href: 'https://heck.sh/posts/10g-ceph-mesh-tinyminimicro/',
  },
] as const

export const PRINTS = [
  {
    name: 'ThinkNAS 2/4/6-bay',
    description:
      'NAS enclosures for M920q/M720q — fits 2, 4, or 6 drives around the machine in a compact form factor.',
    href: 'https://makerworld.com/en/search?keyword=thinkcentre',
    image: `${IMG}/thinknas.webp`,
  },
  {
    name: 'ThinkLab 6-bay',
    description:
      '6-bay lab unit combining the ThinkCentre with drive bays in a single printed enclosure.',
    href: 'https://makerworld.com/en/search?keyword=thinklab',
    image: `${IMG}/6bay-homelab.webp`,
  },
  {
    name: 'Rack mounts',
    description:
      '1U dual mounts, vertical holders, and 10" rack adapters for the Tiny form factor.',
    href: 'https://makerworld.com/en/search?keyword=thinkcentre+rack',
    image: `${IMG}/10inch-rack-mount.webp`,
  },
  {
    name: 'HDD caddies',
    description: 'Drive caddy designs compatible with the ThinkNAS enclosures.',
    href: 'https://www.thingiverse.com/search?q=thinkcentre+caddy',
  },
] as const
