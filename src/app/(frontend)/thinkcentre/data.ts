export const PCIE_NETWORKING = [
  {
    name: 'Mellanox ConnectX-3',
    tag: '10G / 40G',
    note: 'Single or dual-port SFP+. Most common 10G choice for homelab. Widely available used.',
  },
  {
    name: 'Mellanox ConnectX-4 Lx',
    tag: '25G / 100G',
    note: '25G SFP28 or 100G QSFP28. Used in high-throughput clusters where ConnectX-3 bandwidth is a bottleneck.',
  },
  {
    name: 'Intel X520',
    tag: '10G',
    note: 'Dual-port SFP+. Well-supported in Linux, common in the used market, runs cool.',
  },
  {
    name: 'Intel X550',
    tag: '10G',
    note: 'RJ45 or SFP+. Higher power draw than X520 — check chassis thermals before installing.',
  },
  {
    name: 'Intel X710',
    tag: '10G',
    note: 'Good Linux support, lower power draw than X550. Single or dual-port SFP+.',
  },
  {
    name: 'Intel i350-AM4',
    tag: '1G',
    note: 'Quad-port 1GbE. Good for routing, management networks, or multi-WAN setups.',
  },
] as const

export const PCIE_STORAGE = [
  {
    name: 'Dell PERC H200',
    tag: 'SAS / SATA',
    note: 'Flash to IT firmware for TrueNAS/ZFS passthrough. 8 ports SAS/SATA. Common and cheap used.',
  },
  {
    name: 'TISHRIC ASM1166',
    tag: '6× SATA',
    note: 'SATA controller for adding up to 6 drives via the TinyRiser PCIe slot. Good TrueNAS compatibility.',
  },
] as const

export const PCIE_GPUS = [
  {
    name: 'NVIDIA Quadro K1200',
    tag: 'GPU',
    note: 'Low-profile, 4× Mini DisplayPort, passive-cooled option available. Good for display output.',
  },
  {
    name: 'NVIDIA T600',
    tag: 'GPU',
    note: 'Low-profile, 4× Mini DP, 40W TDP. Good for light inference workloads.',
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
  },
] as const

export const BUILDS = [
  {
    title: '4-bay NAS',
    tag: 'nas',
    description:
      'DIY 4-bay NAS from an M720q with 3D-printed enclosure and TinyRiser storage expansion.',
    href: 'https://www.reddit.com/r/homelab/comments/1qllfjn/thinkbox_released_diy_4bay_nas_and_powerful/',
  },
  {
    title: '6-bay 10G NAS',
    tag: 'nas',
    description:
      '6-bay NAS with 10GbE networking built from an M720q — drives, NIC, and enclosure walkthrough.',
    href: 'https://www.reddit.com/r/homelab/comments/1sdmgzm/built_a_6bay_10gbps_nas_from_a_lenovo_m720q/',
  },
  {
    title: 'Kubernetes cluster',
    tag: 'k8s',
    description:
      'Multi-node bare-metal K8s cluster using M920q nodes — hardware selection and cluster setup.',
    href: 'https://blog.zolty.systems/posts/2026-02-07-choosing-the-hardware',
  },
  {
    title: 'OPNsense router',
    tag: 'networking',
    description:
      'M720q running OPNsense as a full-featured home router with an Intel NIC installed via TinyRiser.',
    href: 'https://www.reddit.com/r/homelab/comments/1lvnv72/built_a_opnsense_router_from_a_lenovo_m720q_intel/',
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
  },
  {
    name: 'ThinkLab 6-bay',
    description:
      '6-bay lab unit combining the ThinkCentre with drive bays in a single printed enclosure.',
    href: 'https://makerworld.com/en/search?keyword=thinklab',
  },
  {
    name: 'Rack mounts',
    description:
      '1U dual mounts, vertical holders, and 10" rack adapters for the Tiny form factor.',
    href: 'https://makerworld.com/en/search?keyword=thinkcentre+rack',
  },
  {
    name: 'HDD caddies',
    description: 'Drive caddy designs compatible with the ThinkNAS enclosures.',
    href: 'https://www.thingiverse.com/search?q=thinkcentre+caddy',
  },
] as const
