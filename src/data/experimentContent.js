export const experimentContent = {
  // Physics Lab
  "Ohm's Law Verification": {
    theory: "Ohm's Law states that the current flowing through a conductor is directly proportional to the voltage across it, provided the temperature remains constant. Mathematically, V = IR, where V is voltage, I is current, and R is resistance.",
    procedure: [
      "Connect the circuit with resistor, ammeter, voltmeter, and variable power supply",
      "Set the voltage to minimum and note the ammeter and voltmeter readings",
      "Gradually increase voltage in steps and record corresponding current values",
      "Plot a graph between voltage (V) and current (I)",
      "Calculate resistance from the slope of the V-I graph"
    ],
    formulas: "V = IR\nR = V/I\nPower: P = VI = I²R = V²/R",
    diagram: "https://ask.learncbse.in/uploads/db3785/original/3X/3/3/3336f9e1fc421d19f087b55ab5712e08c7065a6f.png"
  },
  "Measurement of Resistance using Voltmeter & Ammeter": {
    theory: "Resistance can be measured using voltmeter-ammeter method by applying Ohm's law. The voltmeter measures potential difference across the resistor while ammeter measures current through it. Resistance R = V/I.",
    procedure: [
      "Connect the resistor in series with ammeter and battery",
      "Connect voltmeter in parallel across the resistor",
      "Close the circuit and note ammeter and voltmeter readings",
      "Repeat for different voltage values",
      "Calculate resistance using R = V/I for each reading"
    ],
    formulas: "R = V/I\nResistance in series: R = R₁ + R₂ + R₃\nResistance in parallel: 1/R = 1/R₁ + 1/R₂",
    diagram: "https://www.codrey.com/wp-content/uploads/2020/08/Ammeter-Voltmeter-First-configuration.png"
  },
  "Verification of Kirchhoff's Laws": {
    theory: "Kirchhoff's Current Law (KCL): Sum of currents entering a junction equals sum of currents leaving. Kirchhoff's Voltage Law (KVL): Sum of voltages around any closed loop equals zero.",
    procedure: [
      "Set up a circuit with multiple loops and junctions",
      "Measure currents at each junction using ammeters",
      "Verify KCL by checking sum of incoming and outgoing currents",
      "Measure voltages across each component in a loop",
      "Verify KVL by checking algebraic sum of voltages equals zero"
    ],
    formulas: "KCL: ΣI(in) = ΣI(out)\nKVL: ΣV = 0 (around closed loop)",
    diagram: "https://electricalnotebook.com/wp-content/uploads/2022/05/KCL-1.jpg"
  },
  "Determination of Focal Length of Convex Lens": {
    theory: "A convex lens converges parallel rays of light to a point called the focal point. The distance between the optical center and focal point is the focal length. Using lens formula: 1/f = 1/v - 1/u.",
    procedure: [
      "Place the convex lens on a lens holder",
      "Focus a distant object on a screen to get a sharp image",
      "Measure the distance between lens and screen (focal length)",
      "Repeat by placing object at different distances",
      "Calculate focal length using lens formula"
    ],
    formulas: "1/f = 1/v - 1/u\nMagnification: m = v/u = h'/h\nPower: P = 1/f (in meters)",
    diagram: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgqWeXaPSJkVujE5uSXs5hXOP-sutDwZMJgf7XiwozBNZ_nKD9AQF3yg_8xyfeJ05uzeVbebcc4EklVxgVR1elaWpXFiY5RCkuVIcgah7vh_GZq3DlUsM3G6G1SA7CctfoS1rpCYtfUsA2N/s640/15D03.jpg"
  },
  "Resonance in LCR Circuit": {
    theory: "In an LCR circuit, resonance occurs when inductive reactance equals capacitive reactance. At resonance, impedance is minimum and current is maximum. Resonant frequency: f₀ = 1/(2π√LC).",
    procedure: [
      "Connect inductor, capacitor, and resistor in series with AC source",
      "Vary the frequency of AC source gradually",
      "Note the current at each frequency using ammeter",
      "Plot graph between frequency and current",
      "Identify resonant frequency where current is maximum"
    ],
    formulas: "",
    diagram: "https://cmds-test.vedantu.com/prod/question-sets/872bbded-ff26-489e-b06b-efcb10b51fd7215865655999643146.png"
  },
  "Measurement of Frequency using Sonometer": {
    theory: "A sonometer consists of a wire stretched over a hollow wooden box. When plucked, it vibrates with a frequency that depends on length, tension, and mass per unit length. Frequency f = (1/2L)√(T/μ).",
    procedure: [
      "Set up the sonometer with wire under known tension",
      "Place bridges to adjust the vibrating length of wire",
      "Pluck the wire and match its frequency with tuning fork",
      "Adjust length until resonance occurs",
      "Calculate frequency using the formula"
    ],
    formulas: "",
    diagram: "https://simplifiednote.com/wp-content/uploads/2023/08/diagram.png"
  },
  "Reflection & Refraction through Prism": {
    theory: "When light passes through a prism, it undergoes refraction at both surfaces. The angle of deviation depends on the angle of incidence, prism angle, and refractive index. Minimum deviation occurs at symmetric incidence.",
    procedure: [
      "Place the prism on a drawing board and trace its outline",
      "Fix two pins on incident ray side",
      "Look through the prism and fix two pins on emergent ray side",
      "Remove prism and join the pin marks to get ray path",
      "Measure angles of incidence, emergence, and deviation"
    ],
    formuals: "",
    diagram: "https://www.shutterstock.com/image-vector/refraction-light-through-glass-prism-260nw-2084059270.jpg"
  },
  "Determination of Acceleration due to Gravity using Pendulum": {
    theory: "A simple pendulum consists of a mass suspended by a string. Its time period T = 2π√(L/g), where L is length and g is acceleration due to gravity. By measuring T and L, we can calculate g.",
    procedure: [
      "Suspend a bob from a rigid support using a thread",
      "Measure the effective length of the pendulum",
      "Displace the bob slightly and release it",
      "Measure time for 20 oscillations using stopwatch",
      "Calculate time period and then g using formula"
    ],
    formuals: "",
    diagram: "https://physicsteacher.in/wp-content/uploads/2021/04/image-38.png"
  },
  "Study of Diode Characteristics": {
    theory: "A diode allows current flow in forward bias and blocks in reverse bias. Forward bias: anode positive, cathode negative. Reverse bias: opposite polarity. The V-I characteristic curve shows this behavior.",
    procedure: [
      "Connect diode in forward bias with variable DC source",
      "Gradually increase voltage and note current readings",
      "Plot forward characteristic curve (V vs I)",
      "Reverse the diode connections for reverse bias",
      "Plot reverse characteristic curve"
    ],
    formulas: "",
    diagram: "https://cmds-test.vedantu.com/prod/question-sets/79ff362a-90ba-4eed-b6aa-04278de4a4246097841530214293653.png"
  },
  "Determination of Wavelength using Diffraction Grating": {
    theory: "Diffraction grating consists of parallel slits that diffract light. When monochromatic light passes through it, bright fringes appear at angles satisfying nλ = d sinθ, where d is grating element.",
    procedure: [
      "Mount the diffraction grating on spectrometer table",
      "Illuminate with monochromatic light source",
      "Adjust telescope to see the central bright fringe",
      "Rotate telescope to measure angles of first and second order fringes",
      "Calculate wavelength using grating formula"
    ],
    formulas: "",
    diagram: "https://i.ytimg.com/vi/Y-KNsGiVbeM/maxresdefault.jpg"
  },

  // Chemistry Lab
  "Acid-Base Titration": {
    theory: "Titration is a technique to determine concentration of an unknown solution by reacting it with a standard solution. In acid-base titration, an acid reacts with a base until neutralization occurs, indicated by color change of indicator.",
    procedure: [
      "Rinse burette with standard NaOH solution and fill it",
      "Pipette out known volume of acid into conical flask",
      "Add 2-3 drops of phenolphthalein indicator",
      "Titrate by adding NaOH dropwise until pink color appears",
      "Note the burette reading and calculate concentration"
    ],
    formulas: "N₁V₁ = N₂V₂\nMolarity = (moles of solute) / (volume in L)\npH = -log[H⁺]",
    diagram: "https://media.geeksforgeeks.org/wp-content/uploads/20240411181448/Acid-Base-Titration.png"
  },
  "Determination of pH using pH Meter": {
    theory: "pH measures acidity or basicity of a solution on a scale of 0-14. pH 7 is neutral, <7 is acidic, >7 is basic. pH meter measures hydrogen ion concentration using a glass electrode and reference electrode.",
    procedure: [
      "Calibrate pH meter using buffer solutions of known pH",
      "Rinse the electrode with distilled water",
      "Dip the electrode in the test solution",
      "Wait for reading to stabilize on display",
      "Record the pH value and rinse electrode"
    ],
    formulas: "pH = -log[H⁺]\npOH = -log[OH⁻]\npH + pOH = 14",
    diagram: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRDS1_i7qqHxoMqRCdyLj7tfkq5UbVWD6MFg&s"
  },
  "Determination of Chloride Content in Water": {
    theory: "Chloride content in water is determined by Mohr's method using silver nitrate titration. Silver ions react with chloride to form white AgCl precipitate. Potassium chromate indicator turns red when all chloride is consumed.",
    procedure: [
      "Take known volume of water sample in conical flask",
      "Add potassium chromate indicator (yellow color)",
      "Titrate with standard silver nitrate solution",
      "End point is appearance of reddish-brown color",
      "Calculate chloride content from titration volume"
    ],
    formulas: "",
    diagram: "https://media.cheggcdn.com/study/7c9/7c9da7ad-901c-4f98-a414-8e4e59d6c4ec/image"
  },
  "Estimation of Hardness of Water by EDTA Method": {
    theory: "Water hardness is due to calcium and magnesium salts. EDTA forms stable complexes with Ca²⁺ and Mg²⁺ ions. Eriochrome Black T indicator changes from wine red to blue at end point when all hardness ions are complexed.",
    procedure: [
      "Take water sample in conical flask",
      "Add buffer solution to maintain pH 10",
      "Add Eriochrome Black T indicator (wine red color)",
      "Titrate with standard EDTA solution",
      "End point is color change from wine red to blue"
    ],
    formulas: "",
    diagram: "https://www.researchgate.net/publication/346858583/figure/fig1/AS:967072532156420@1607579467616/Schematic-diagram-for-the-determination-of-total-hardness-by-EDTA-titration-and-TDS-EC.png"
  },
  "Chemical Kinetics: Rate of Reaction of Hydrolysis of Ester": {
    theory: "Chemical kinetics studies the rate of chemical reactions. Ester hydrolysis in presence of acid follows first-order kinetics. Rate constant k can be determined by measuring concentration at different time intervals.",
    procedure: [
      "Prepare ester solution with known concentration",
      "Add acid catalyst and start timer",
      "Withdraw samples at regular time intervals",
      "Titrate each sample to determine ester concentration",
      "Plot ln(concentration) vs time to get rate constant"
    ],
    formulas: "",
    diagram: "https://www.researchgate.net/publication/46403931/figure/fig2/AS:272806625673252@1442053576860/Kinetics-for-the-hydrolysis-of-ester-6-in-the-presence-or-absence-of-the.png"
  },
  "Preparation of Standard Solution of Sodium Carbonate": {
    theory: "A standard solution has accurately known concentration. Sodium carbonate is a primary standard as it's stable, pure, and non-hygroscopic. It's used to standardize acid solutions.",
    procedure: [
      "Weigh accurately calculated amount of Na₂CO₃",
      "Dissolve in small amount of distilled water in beaker",
      "Transfer to volumetric flask using funnel",
      "Rinse beaker and funnel, add washings to flask",
      "Make up to the mark with distilled water and mix"
    ],
    formulas: "",
    diagram: "https://cdn.testbook.com/1709918481359-preparation%20of%20standard%20solution%20of%20sodium%20carbonate.png/1709918483.png"
  },
  "Conductometric Titration": {
    theory: "Conductometric titration measures change in electrical conductivity during titration. Conductivity depends on ion concentration. The equivalence point is determined from the break in conductivity vs volume curve.",
    procedure: [
      "Take known volume of acid in beaker",
      "Dip conductivity cell in the solution",
      "Note initial conductivity reading",
      "Add base in small portions and record conductivity after each addition",
      "Plot conductivity vs volume to find equivalence point"
    ],
    formulas: "",
    diagram: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0HIySxlfwgxN67_ava6quLnEFkMdS1uwKDw&s"
  },
  "Determination of Iron by Colorimetry": {
    theory: "Colorimetry measures concentration based on color intensity. Iron forms colored complex with thiocyanate. The absorbance is proportional to concentration (Beer-Lambert law: A = εcl).",
    procedure: [
      "Prepare standard iron solutions of known concentrations",
      "Add thiocyanate reagent to develop red color",
      "Measure absorbance of standards using colorimeter",
      "Plot calibration curve (absorbance vs concentration)",
      "Measure absorbance of unknown and find concentration from curve"
    ],
    formulas: "",
    diagram: "https://microbenotes.com/wp-content/uploads/2022/12/Principle-of-Colorimeter.jpg"
  },
  "Determination of Viscosity of Liquid": {
    theory: "Viscosity is resistance to flow. Ostwald viscometer compares flow times of liquid and reference. Viscosity η = (ρt/ρ₀t₀)η₀, where ρ is density, t is flow time, subscript 0 refers to reference liquid.",
    procedure: [
      "Clean and dry the Ostwald viscometer",
      "Fill with reference liquid (water) up to mark",
      "Measure time for liquid to flow between two marks",
      "Repeat with test liquid",
      "Calculate viscosity using the formula"
    ],
    formulas: "",
    diagram: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR95GTCysHfv7JdoAhBoTpusVrhB4dKt9jmnA&s"
  },
  "Preparation of Simple Salts": {
    theory: "Salts are formed by neutralization of acids and bases. Simple salts contain one type of cation and anion. Crystallization is used to obtain pure salt crystals from solution.",
    procedure: [
      "React appropriate acid with base in stoichiometric ratio",
      "Heat the mixture to ensure complete reaction",
      "Filter to remove any impurities",
      "Evaporate solution to get saturated solution",
      "Cool slowly to obtain crystals, filter and dry"
    ],
    formulas: "",
    diagram: "https://mrtremblaycambridge.weebly.com/uploads/9/7/8/8/9788395/9103558_orig.jpg"
  },

  // Electrical Lab
  "Verification of Ohm's Law": {
    theory: "Ohm's Law states that current through a conductor is directly proportional to voltage across it at constant temperature. V = IR, where V is voltage in volts, I is current in amperes, and R is resistance in ohms.",
    procedure: [
      "Connect resistor, ammeter, voltmeter in circuit with DC source",
      "Set voltage to minimum value",
      "Note ammeter and voltmeter readings",
      "Increase voltage in steps and record readings",
      "Plot V-I graph and verify linear relationship"
    ],
    formulas: "V = IR\nR = V/I\nConductance: G = 1/R\nPower: P = VI",
    diagram: "https://ask.learncbse.in/uploads/db3785/original/3X/3/3/3336f9e1fc421d19f087b55ab5712e08c7065a6f.png"
  },
  "Measurement of Power and Power Factor in AC Circuit": {
    theory: "In AC circuits, real power P = VI cosφ, where φ is phase angle between voltage and current. Power factor = cosφ = P/(VI). Wattmeter measures real power directly.",
    procedure: [
      "Connect wattmeter, ammeter, voltmeter in AC circuit",
      "Switch on AC supply and note all meter readings",
      "Calculate apparent power = V × I",
      "Real power is read from wattmeter",
      "Calculate power factor = Real Power / Apparent Power"
    ],
    formulas: "Power Factor = cosφ = P/(VI)\nReal Power: P = VI cosφ\nReactive Power: Q = VI sinφ",
    diagram: "https://i0.wp.com/electricallab.in/wp-content/uploads/2023/09/ckt-2.jpg?resize=750%2C211&ssl=1"
  },
  "Study of Series & Parallel RLC Circuit": {
    theory: "RLC circuit contains resistor, inductor, and capacitor. In series: same current flows through all. In parallel: same voltage across all. Impedance and phase relationships differ in both configurations.",
    procedure: [
      "Connect R, L, C in series with AC source",
      "Measure voltage across each component and total current",
      "Calculate impedance and phase angle",
      "Reconnect components in parallel configuration",
      "Repeat measurements and compare results"
    ],
    formuals: "",
    diagram: "https://www.electrical4u.com/wp-content/uploads/What-is-RLC-Circuit-Analysis.png"
  },
  "Measurement of Energy using Energy Meter": {
    theory: "Energy meter measures electrical energy consumed in kWh. It has voltage and current coils that produce torque proportional to power. The disc rotates and drives a counter mechanism.",
    procedure: [
      "Connect energy meter in the circuit with load",
      "Note initial reading of energy meter",
      "Switch on load for known time period",
      "Note final reading after specified time",
      "Calculate energy consumed = Final - Initial reading"
    ],
    formulas: "",
    diagram: "https://www.researchgate.net/publication/357318973/figure/fig1/AS:1104736866566150@1640401202338/Circuit-diagram-of-analog-energy-meter.png"
  },
  "Open Circuit & Short Circuit Test on Transformer": {
    theory: "Open circuit test determines core losses and magnetizing current (performed on LV side). Short circuit test determines copper losses and equivalent impedance (performed on HV side).",
    procedure: [
      "For OC test: Keep secondary open, apply rated voltage to primary",
      "Measure voltage, current, and power on primary side",
      "For SC test: Short secondary, apply reduced voltage to primary",
      "Measure voltage, current, and power until rated current flows",
      "Calculate parameters from both tests"
    ],
    formulas: "",
    diagram: "https://media.geeksforgeeks.org/wp-content/uploads/20231011145452/Open-and-Short-Circuit-Test-of-Transformer-2-768.png"
  },
  "Speed Control of DC Motor": {
    theory: "DC motor speed can be controlled by varying armature voltage, field flux, or armature resistance. Speed N ∝ (V - IₐRₐ)/Φ, where V is voltage, Iₐ is armature current, Rₐ is resistance, Φ is flux.",
    procedure: [
      "Connect DC motor with variable voltage source",
      "Measure no-load speed using tachometer",
      "Vary armature voltage in steps",
      "Note speed at each voltage setting",
      "Plot speed vs voltage characteristic curve"
    ],
    formulas: "",
    diagram: "https://circuitstoday.com/wp-content/uploads/2010/03/low-voltage-DC-motor-speed-control.png"
  },
  "Load Test on DC Shunt Motor": {
    theory: "Load test determines performance characteristics of DC motor. As load increases, speed decreases slightly, current increases, and efficiency first increases then decreases after reaching maximum.",
    procedure: [
      "Connect DC shunt motor with loading arrangement",
      "Run motor at no load and note speed, current, voltage",
      "Apply load gradually in steps",
      "Note speed, input current, and output torque at each load",
      "Calculate efficiency and plot characteristic curves"
    ],
    formulas: "",
    diagram: "https://electricallab.in/wp-content/uploads/2023/08/fig-1-5.jpg"
  },
  "Measurement of Current using Ammeter": {
    theory: "Ammeter measures electric current and is connected in series with the circuit. It has very low resistance to minimize voltage drop. Range can be extended using shunt resistors.",
    procedure: [
      "Connect ammeter in series with load and power supply",
      "Ensure correct polarity and range selection",
      "Switch on the circuit",
      "Read the current value from ammeter scale",
      "Verify reading by calculating from voltage and resistance"
    ],
    formulas: "",
    diagram: "https://www.allaboutcircuits.com/uploads/articles/ammeter-illustration-1.jpg"
  },
  "Single Phase Bridge Rectifier": {
    theory: "Bridge rectifier converts AC to DC using four diodes. During positive half cycle, two diodes conduct; during negative half cycle, other two conduct. Output is full-wave rectified DC.",
    procedure: [
      "Connect four diodes in bridge configuration",
      "Connect AC source to input terminals",
      "Connect load resistor across output terminals",
      "Observe input AC waveform on oscilloscope",
      "Observe output rectified waveform and measure DC voltage"
    ],
    formulas: "",
    diagram: "https://electricalworkbook.com/wp-content/uploads/2021/07/Single-Phase-Rectifier.png"
  },
  "Study of Star and Delta Connections": {
    theory: "Three-phase systems use star (Y) or delta (Δ) connections. In star: line voltage = √3 × phase voltage, line current = phase current. In delta: line voltage = phase voltage, line current = √3 × phase current.",
    procedure: [
      "Connect three coils in star configuration",
      "Measure line and phase voltages and currents",
      "Verify star relationships",
      "Reconnect coils in delta configuration",
      "Measure parameters and verify delta relationships"
    ],
    formulas : "",
    diagram: "https://www.electricaltechnology.org/wp-content/uploads/2014/09/Difference-between-Star-and-Delta-Connections.png"
  }
};
