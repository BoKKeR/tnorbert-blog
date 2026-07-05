export const USE_CASES = [
  {
    title: 'NVMe Ceph OSD node',
    tag: 'storage',
    description:
      'Add a PCIe NVMe drive as a Ceph OSD. Three M920Q nodes with TinyRiser cards form a distributed Ceph cluster with replication and fast block storage.',
  },
  {
    title: 'NAS / TrueNAS node',
    tag: 'storage',
    description:
      'Install a PCIe SATA controller or NVMe drive via TinyRiser and run TrueNAS SCALE. The M920Q becomes a compact, silent NAS with full ZFS support.',
  },
  {
    title: '10G / 25G networking node',
    tag: 'networking',
    description:
      'Slot an SFP+ NIC into the TinyRiser PCIe port. Pairs well with a managed switch for a high-throughput homelab backbone — used in my cluster for 25GbE node-to-node links.',
  },
  {
    title: '2.5G edge router',
    tag: 'networking',
    description:
      'Add a 2.5GbE PCIe NIC for multi-WAN or a segmented network. The M920Q runs cool and quiet on ~35 W — ideal as an always-on router or firewall node.',
  },
  {
    title: 'GPU compute node',
    tag: 'compute',
    description:
      'Mount a low-profile GPU or accelerator card via the PCIe x4 slot for local inference or CUDA workloads. Bandwidth is gen 3 x4 — suited for lighter workloads.',
  },
] as const

export const ASSEMBLY_STEPS = [
  {
    step: '1',
    label: 'Stencil & paste',
    detail:
      'Apply solder paste through an SMD stencil onto the top-side pads. A 3D-printed jig holds the board steady. The stencil ensures consistent paste volume on the small SMD pads.',
  },
  {
    step: '2',
    label: 'Place SMD components',
    detail:
      'Place capacitors, resistors, and ICs on the top side by hand using tweezers. No mandatory ICs — some resellers skip them — but I include them for reliability.',
  },
  {
    step: '3',
    label: 'Reflow (hot plate)',
    detail:
      'Reflow the top side on a USB-C hot plate. The paste melts and self-centres the components. Watch for bridges, especially around the NVMe pads — they need clearing under the microscope.',
  },
  {
    step: '4',
    label: 'Connectors & standoffs',
    detail:
      'Add top-side connectors and the standoff using a 3D-printed jig. Tape down the edge connector to keep solder off it before the drag-soldering step.',
  },
  {
    step: '5',
    label: 'Drag solder PCIe pins',
    detail:
      'Drag solder approximately 90 PCIe edge connector pins by hand. Flux liberally, drag at a consistent angle. A soldering iron alone works fine — the hot plate is just faster for the SMD side.',
  },
  {
    step: '6',
    label: 'LED & resistor',
    detail:
      'Hand-place the LED and current-limiting resistor, then reflow with hot air. The LED indicates power-on state through the M920Q chassis without needing to open the machine.',
  },
  {
    step: '7',
    label: 'Clean & inspect',
    detail:
      'Clean the board with isopropyl alcohol. Inspect all joints under a microscope — solder bridges on the NVMe pads are the most common issue and need to be cleared before the board ships.',
  },
  {
    step: '8',
    label: 'Tape & test',
    detail:
      'Apply insulation tape to the back of the board. Install in an M920Q and confirm the PCIe slot is detected in the BIOS — every board is tested before it goes out.',
  },
] as const

export const UPGRADES = [
  {
    label: 'RAM',
    slot: 'SO-DIMM (2 slots)',
    note: 'Up to 64 GB DDR4. 2 × 32 GB SO-DIMMs. 3200 MHz sticks work fine.',
  },
  {
    label: 'NVMe (boot)',
    slot: 'M.2 2280 (M key)',
    note: 'Built-in M.2 slot — PCIe 3.0 x4. No TinyRiser required for this one.',
  },
  {
    label: 'NVMe (expansion)',
    slot: 'TinyRiser PCIe',
    note: 'Add a second NVMe drive via TinyRiser. Used for Ceph OSDs or extra storage.',
  },
  {
    label: '2.5G NIC',
    slot: 'M.2 A+E key',
    note: 'Replace the Wi-Fi card with a 2.5GbE Intel NIC (e.g. I225-V). No TinyRiser required.',
  },
  {
    label: 'SFP+ / 10G NIC',
    slot: 'TinyRiser PCIe',
    note: 'PCIe x4 SFP+ cards work well. I use these for 25GbE node-to-node links in my cluster.',
  },
  {
    label: 'Wi-Fi',
    slot: 'M.2 A+E key',
    note: 'AX200 / AX210 cards drop in. Useful if you want wireless on a controller node.',
  },
] as const
