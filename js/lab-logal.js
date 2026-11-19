/* ==========================================================================
   MODUL LAB LOGIKA & ALGORITMA (PERTEMUAN 1 - 7)
   Rule-Based Compiler: Form Kasus -> Deskriptif, Flowchart SVG, Pseudocode, Java
   File: js/lab-logal.js
   ========================================================================== */
(function () {
    const PRESET_EXAMPLES = {
        kelulusan: {
            title: "Cek_Kelulusan_Mahasiswa",
            inputs: "nilai (int)",
            logicType: "ifelse",
            condition: "nilai >= 75",
            yesProcess: "status = \"LULUS\"",
            noProcess: "status = \"TIDAK LULUS\"",
            output: "status"
        },
        luas_segitiga: {
            title: "Hitung_Luas_Segitiga",
            inputs: "alas (double), tinggi (double)",
            logicType: "sequence",
            condition: "",
            yesProcess: "luas = 0.5 * alas * tinggi",
            noProcess: "",
            output: "luas"
        },
        deret_angka: {
            title: "Cetak_Deret_Angka",
            inputs: "batas (int)",
            logicType: "loop",
            condition: "i <= batas",
            yesProcess: "Tampilkan nilai i",
            noProcess: "",
            output: "\"Selesai mencetak deret\""
        }
    };

    window.renderLogalLab = function (containerEl, meeting, saveCallback) {
        if (!meeting.logalStudio) {
            meeting.logalStudio = {
                form: { ...PRESET_EXAMPLES.kelulusan },
                notasi1: "",
                notasi3: "",
                javaCode: "",
                javaExplain: []
            };
        }

        const state = meeting.logalStudio;

        containerEl.innerHTML = `
            <div style="background:var(--green-bg); border:2.5px solid var(--green-main); border-radius:22px; padding:20px;">
                <!-- HEADER LAB -->
                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; padding-bottom:12px; border-bottom:2px solid var(--green-border);">
                    <div>
                        <span style="background:var(--green-main); color:#fff; font-size:11px; font-weight:700; padding:3px 10px; border-radius:10px;">RULE-BASED ALGORITHM STUDIO</span>
                        <h3 style="margin:6px 0 2px; color:var(--green-main); font-size:20px;">🧩 Lab Logika &amp; Algoritma — Pertemuan ${meeting.number}</h3>
                        <p style="margin:0; font-size:13px; color:var(--green-muted);">Isi kerangka soal sekali untuk generate otomatis 3 Notasi + Kode Java, atau edit tiap bagian satu per satu.</p>
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center;">
                        <span style="font-size:12px; font-weight:700; color:var(--green-text);">Contoh Cepat:</span>
                        <button type="button" class="btn-green-outline logal-preset-btn" data-preset="luas_segitiga" style="padding:5px 10px; font-size:12px;">Runtunan</button>
                        <button type="button" class="btn-green-outline logal-preset-btn" data-preset="kelulusan" style="padding:5px 10px; font-size:12px;">If-Else</button>
                        <button type="button" class="btn-green-outline logal-preset-btn" data-preset="deret_angka" style="padding:5px 10px; font-size:12px;">Perulangan</button>
                    </div>
                </div>

                <!-- PANEL INPUT PERTANYAAN / KERANGKA ALGORITMA -->
                <div style="background:var(--green-white); border:2px solid var(--green-main); border-radius:18px; padding:16px; margin-bottom:18px;">
                    <div style="font-weight:700; color:var(--green-main); font-size:14.5px; margin-bottom:12px;">
                        ✨ Langkah 1: Masukkan Soal / Logika Program
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap:12px; margin-bottom:12px;">
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Nama Program / Judul</label>
                            <input type="text" id="lgTitle" value="${escapeHtml(state.form.title)}" placeholder="Contoh: Cek_Kelulusan"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>

                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Variabel Input &amp; Tipe Data</label>
                            <input type="text" id="lgInputs" value="${escapeHtml(state.form.inputs)}" placeholder="Contoh: nilai (int), nama (String)"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>

                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Struktur Kontrol Logika</label>
                            <select id="lgLogicType" style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:700;">
                                <option value="sequence" ${state.form.logicType === "sequence" ? "selected" : ""}>1. Runtunan (Sequence Biasa)</option>
                                <option value="ifelse" ${state.form.logicType === "ifelse" ? "selected" : ""}>2. Percabangan (IF - ELSE)</option>
                                <option value="loop" ${state.form.logicType === "loop" ? "selected" : ""}>3. Perulangan (WHILE Loop)</option>
                            </select>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap:12px; margin-bottom:14px;">
                        <div id="lgConditionWrap">
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Syarat Kondisi (IF / WHILE)</label>
                            <input type="text" id="lgCondition" value="${escapeHtml(state.form.condition)}" placeholder="Contoh: nilai >= 75"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>

                        <div>
                            <label id="lgYesLabel" style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Proses Jika YA / Proses Utama</label>
                            <input type="text" id="lgYesProcess" value="${escapeHtml(state.form.yesProcess)}" placeholder='Contoh: status = "LULUS"'
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>

                        <div id="lgNoWrap">
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Proses Jika TIDAK (ELSE)</label>
                            <input type="text" id="lgNoProcess" value="${escapeHtml(state.form.noProcess)}" placeholder='Contoh: status = "TIDAK LULUS"'
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>

                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Output yang Ditampilkan</label>
                            <input type="text" id="lgOutput" value="${escapeHtml(state.form.output)}" placeholder="Contoh: status"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>
                    </div>

                    <button type="button" id="lgGenerateAllBtn" class="btn-green-solid" style="width:100%;">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Otomatis: Notasi 1, Flowchart, Pseudocode &amp; Java!
                    </button>
                </div>

                <!-- SUB-TAB NAVIGASI: BISA LIHAT SEMUA ATAU KERJAKAN 1 PER 1 -->
                <div style="display:flex; flex-wrap:wrap; gap:7px; margin-bottom:14px;">
                    <button type="button" class="btn-green-solid lg-view-btn active" data-view="all">📋 Tampilkan Semua (4-in-1)</button>
                    <button type="button" class="btn-green-outline lg-view-btn" data-view="n1">1️⃣ Notasi Deskriptif</button>
                    <button type="button" class="btn-green-outline lg-view-btn" data-view="n2">2️⃣ Notasi Flowchart</button>
                    <button type="button" class="btn-green-outline lg-view-btn" data-view="n3">3️⃣ Notasi Pseudocode</button>
                    <button type="button" class="btn-green-outline lg-view-btn" data-view="java">☕ Kode Java &amp; Penjelasan</button>
                </div>

                <!-- AREA HASIL 4 BAGIAN -->
                <div id="lgResultsGrid" style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    <!-- NOTASI 1: DESKRIPTIF -->
                    <div class="lg-card" data-card="n1" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">1️⃣ Notasi 1: Deskriptif</strong>
                            <button type="button" class="btn-green-outline lg-copy-btn" data-target="lgNotasi1Text" style="padding:3px 9px; font-size:11px;">Salin</button>
                        </div>
                        <textarea id="lgNotasi1Text" style="width:100%; box-sizing:border-box; min-height:220px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:inherit; font-size:13.5px; line-height:1.6; background:var(--green-bg); color:var(--green-text);">${escapeHtml(state.notasi1)}</textarea>
                    </div>

                    <!-- NOTASI 2: FLOWCHART SVG OTOMATIS -->
                    <div class="lg-card" data-card="n2" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">2️⃣ Notasi 2: Flowchart (Auto-Branching)</strong>
                            <span style="font-size:11px; font-weight:700; color:var(--green-muted);">Simbol Standar ISO</span>
                        </div>
                        <div id="lgFlowSvgContainer" style="background:var(--green-bg); border:2px solid var(--green-border); border-radius:12px; padding:10px; overflow-x:auto; display:flex; justify-content:center; min-height:220px;"></div>
                    </div>

                    <!-- NOTASI 3: PSEUDOCODE -->
                    <div class="lg-card" data-card="n3" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">3️⃣ Notasi 3: Pseudocode</strong>
                            <button type="button" class="btn-green-outline lg-copy-btn" data-target="lgNotasi3Text" style="padding:3px 9px; font-size:11px;">Salin</button>
                        </div>
                        <textarea id="lgNotasi3Text" style="width:100%; box-sizing:border-box; min-height:250px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:monospace; font-size:13px; line-height:1.55; background:var(--green-bg); color:var(--green-text);">${escapeHtml(state.notasi3)}</textarea>
                    </div>

                    <!-- BAGIAN 4: KODE PROGRAM JAVA + BEDAH KODE -->
                    <div class="lg-card" data-card="java" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">☕ Kode Program Java</strong>
                            <button type="button" class="btn-green-outline lg-copy-btn" data-target="lgJavaText" style="padding:3px 9px; font-size:11px;">Salin Java</button>
                        </div>
                        <textarea id="lgJavaText" style="width:100%; box-sizing:border-box; min-height:250px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:monospace; font-size:12.5px; line-height:1.5; background:#14281d; color:#e9f5db;">${escapeHtml(state.javaCode)}</textarea>
                    </div>
                </div>

                <!-- TABEL PENJELASAN ISI KODE JAVA -->
                <div class="lg-card" data-card="java" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px; margin-top:16px;">
                    <strong style="display:block; color:var(--green-main); font-size:15px; margin-bottom:10px;">
                        🔍 Bedah Sintaks &amp; Penjelasan Isi Kode Java
                    </strong>
                    <div id="lgJavaExplainList" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:10px;"></div>
                </div>
            </div>
        `;

        // Responsive style
        const styleEl = document.createElement("style");
        styleEl.textContent = `@media (max-width: 860px) { #lgResultsGrid { grid-template-columns: 1fr !important; } }`;
        containerEl.appendChild(styleEl);

        // Referensi Elemen
        const titleEl = containerEl.querySelector("#lgTitle");
        const inputsEl = containerEl.querySelector("#lgInputs");
        const logicTypeEl = containerEl.querySelector("#lgLogicType");
        const condEl = containerEl.querySelector("#lgCondition");
        const yesEl = containerEl.querySelector("#lgYesProcess");
        const noEl = containerEl.querySelector("#lgNoProcess");
        const outEl = containerEl.querySelector("#lgOutput");

        const condWrap = containerEl.querySelector("#lgConditionWrap");
        const noWrap = containerEl.querySelector("#lgNoWrap");
        const yesLabel = containerEl.querySelector("#lgYesLabel");

        const n1Text = containerEl.querySelector("#lgNotasi1Text");
        const n3Text = containerEl.querySelector("#lgNotasi3Text");
        const javaText = containerEl.querySelector("#lgJavaText");
        const svgContainer = containerEl.querySelector("#lgFlowSvgContainer");
        const explainContainer = containerEl.querySelector("#lgJavaExplainList");

        function syncFormVisibility() {
            const mode = logicTypeEl.value;
            if (mode === "sequence") {
                condWrap.style.display = "none";
                noWrap.style.display = "none";
                yesLabel.textContent = "Proses / Rumus Perhitungan";
            } else if (mode === "ifelse") {
                condWrap.style.display = "block";
                noWrap.style.display = "block";
                yesLabel.textContent = "Proses Jika Kondisi YA (True)";
            } else {
                condWrap.style.display = "block";
                noWrap.style.display = "none";
                yesLabel.textContent = "Proses di Dalam Perulangan";
            }
        }

        function parseInputsList(rawInputs) {
            // Memparsing format: "nilai (int), nama (String)"
            return rawInputs.split(",").map(s => s.trim()).filter(Boolean).map(item => {
                const match = item.match(/^([a-zA-Z0-9_]+)\s*(?:\(([^)]+)\))?$/);
                if (match) {
                    return { name: match[1], type: (match[2] || "int").trim() };
                }
                return { name: item.replace(/\s+/g, "_"), type: "int" };
            });
        }

        // ==================================================================
        // MESIN RULE-BASED COMPILER (DESKRIPTIF, FLOWCHART, PSEUDOCODE, JAVA)
        // ==================================================================
        async function runRuleBasedGenerator() {
            const title = (titleEl.value.trim() || "Program_Algoritma").replace(/\s+/g, "_");
            const rawInputs = inputsEl.value.trim() || "x (int)";
            const parsedVars = parseInputsList(rawInputs);
            const logicType = logicTypeEl.value;
            const condition = condEl.value.trim() || "x > 0";
            const yesProc = yesEl.value.trim() || "hasil = x";
            const noProc = noEl.value.trim() || "hasil = 0";
            const output = outEl.value.trim() || "hasil";

            state.form = { title, inputs: rawInputs, logicType, condition, yesProcess: yesProc, noProcess: noProc, output };

            const varNamesStr = parsedVars.map(v => v.name).join(", ");

            // 1. GENERATE NOTASI 1: DESKRIPTIF
            let descLines = [
                `Judul Algoritma: ${title}`,
                `1. Mulai program.`,
                `2. Siapkan variabel input: ${parsedVars.map(v => `${v.name} bertipe ${v.type}`).join(", ")}.`,
                `3. Masukkan (input) nilai ${varNamesStr} dari pengguna.`
            ];

            if (logicType === "sequence") {
                descLines.push(`4. Lakukan proses perhitungan: ${yesProc}.`);
                descLines.push(`5. Tampilkan hasil output berupa ${output}.`);
                descLines.push(`6. Selesai.`);
            } else if (logicType === "ifelse") {
                descLines.push(`4. Periksa kondisi apakah (${condition}):`);
                descLines.push(`   a. Jika BENAR (Ya), maka jalankan proses: ${yesProc}.`);
                descLines.push(`   b. Jika SALAH (Tidak), maka jalankan proses: ${noProc}.`);
                descLines.push(`5. Tampilkan hasil output berupa ${output}.`);
                descLines.push(`6. Selesai.`);
            } else {
                descLines.push(`4. Inisialisasi pencacah i = 1.`);
                descLines.push(`5. Selama kondisi (${condition}) bernilai BENAR, ulangi langkah berikut:`);
                descLines.push(`   a. Jalankan proses: ${yesProc}.`);
                descLines.push(`   b. Tambahkan nilai pencacah i = i + 1.`);
                descLines.push(`6. Jika kondisi sudah SALAH, keluar dari perulangan dan tampilkan ${output}.`);
                descLines.push(`7. Selesai.`);
            }
            state.notasi1 = descLines.join("\n");
            n1Text.value = state.notasi1;

            // 2. GENERATE NOTASI 3: PSEUDOCODE
            let pseudoLines = [
                `ALGORITMA ${title}`,
                `{ Mengolah input ${varNamesStr} untuk menghasilkan ${output} }`,
                ``,
                `DEKLARASI`
            ];
            parsedVars.forEach(v => {
                pseudoLines.push(`    ${v.name} : ${v.type}`);
            });
            if (logicType === "loop") {
                pseudoLines.push(`    i : integer`);
            }
            if (!parsedVars.some(v => v.name === output) && !output.startsWith("\"")) {
                pseudoLines.push(`    ${output} : string / number`);
            }
            pseudoLines.push(``, `DESKRIPSI`);
            parsedVars.forEach(v => {
                pseudoLines.push(`    BACA(${v.name})`);
            });

            if (logicType === "sequence") {
                pseudoLines.push(`    ${yesProc.replace(/=/g, "<-")}`);
            } else if (logicType === "ifelse") {
                pseudoLines.push(`    JIKA (${condition}) MAKA`);
                pseudoLines.push(`        ${yesProc.replace(/=/g, "<-")}`);
                pseudoLines.push(`    LAINNYA`);
                pseudoLines.push(`        ${noProc.replace(/=/g, "<-")}`);
                pseudoLines.push(`    AKHIR_JIKA`);
            } else {
                pseudoLines.push(`    i <- 1`);
                pseudoLines.push(`    SELAMA (${condition}) LAKUKAN`);
                pseudoLines.push(`        ${yesProc}`);
                pseudoLines.push(`        i <- i + 1`);
                pseudoLines.push(`    AKHIR_SELAMA`);
            }
            pseudoLines.push(`    TULIS(${output})`);
            pseudoLines.push(`SELESAI`);

            state.notasi3 = pseudoLines.join("\n");
            n3Text.value = state.notasi3;

            // 3. GENERATE KODE JAVA + PENJELASAN KOMPONENNYA
            const className = title.replace(/[^a-zA-Z0-9_]/g, "");
            let javaLines = [
                `import java.util.Scanner;`,
                ``,
                `public class ${className} {`,
                `    public static void main(String[] args) {`,
                `        Scanner input = new Scanner(System.in);`
            ];

            let explainItems = [
                {
                    code: "import java.util.Scanner;",
                    desc: "Mengimpor library Scanner bawaan Java agar program bisa menerima ketikan input dari keyboard."
                },
                {
                    code: `public class ${className}`,
                    desc: "Mendefinisikan nama kelas utama program Java (harus sama dengan nama file .java)."
                },
                {
                    code: "Scanner input = new Scanner(System.in);",
                    desc: "Membuat objek bernama 'input' untuk membaca data yang dimasukkan pengguna."
                }
            ];

            parsedVars.forEach(v => {
                const jType = v.type.toLowerCase() === "string" ? "String" : v.type.toLowerCase() === "double" ? "double" : "int";
                const readMethod = jType === "String" ? "nextLine()" : jType === "double" ? "nextDouble()" : "nextInt()";
                javaLines.push(`        System.out.print("Masukkan ${v.name}: ");`);
                javaLines.push(`        ${jType} ${v.name} = input.${readMethod};`);
                explainItems.push({
                    code: `${jType} ${v.name} = input.${readMethod};`,
                    desc: `Mendeklarasikan variabel '${v.name}' bertipe ${jType} dan menyimpan nilai input dari pengguna.`
                });
            });

            // Deteksi variabel hasil jika belum ada di input
            const outVarClean = output.replace(/[^a-zA-Z0-9_]/g, "");
            const isOutStringLiteral = output.startsWith("\"");
            const isOutAlreadyDeclared = parsedVars.some(v => v.name === outVarClean);

            if (!isOutStringLiteral && outVarClean && !isOutAlreadyDeclared) {
                const isStringResult = yesProc.includes("\"") || noProc.includes("\"");
                const outType = isStringResult ? "String" : "double";
                javaLines.push(`        ${outType} ${outVarClean};`);
                explainItems.push({
                    code: `${outType} ${outVarClean};`,
                    desc: `Menyiapkan variabel '${outVarClean}' bertipe ${outType} untuk menampung hasil akhir proses.`
                });
            }

            if (logicType === "sequence") {
                javaLines.push(`        ${yesProc};`);
                explainItems.push({
                    code: `${yesProc};`,
                    desc: "Statement aritmatika/assignment untuk menghitung rumus secara berurutan."
                });
            } else if (logicType === "ifelse") {
                javaLines.push(`        if (${condition}) {`);
                javaLines.push(`            ${yesProc};`);
                javaLines.push(`        } else {`);
                javaLines.push(`            ${noProc};`);
                javaLines.push(`        }`);
                explainItems.push({
                    code: `if (${condition}) { ... } else { ... }`,
                    desc: `Struktur percabangan: jika syarat (${condition}) benar jalankan blok atas, jika salah jalankan blok else.`
                });
            } else {
                javaLines.push(`        int i = 1;`);
                javaLines.push(`        while (${condition}) {`);
                javaLines.push(`            System.out.println("Iterasi ke-" + i + ": ${yesProc.replace(/"/g, "'")}");`);
                javaLines.push(`            i++;`);
                javaLines.push(`        }`);
                explainItems.push({
                    code: `while (${condition}) { ... i++; }`,
                    desc: `Struktur perulangan: mengulang perintah selama (${condition}) terpenuhi, dengan i++ menaikkan hitungan tiap putaran.`
                });
            }

            javaLines.push(`        System.out.println("Hasil: " + ${output});`);
            javaLines.push(`        input.close();`);
            javaLines.push(`    }`);
            javaLines.push(`}`);

            explainItems.push({
                code: `System.out.println("Hasil: " + ${output});`,
                desc: `Mencetak hasil akhir (${output}) ke layar konsol.`
            });

            state.javaCode = javaLines.join("\n");
            state.javaExplain = explainItems;
            javaText.value = state.javaCode;

            renderFlowchartSVG();
            renderJavaExplainCards();
            await saveCallback();
        }

        // ==================================================================
        // RENDER FLOWCHART SVG OTOMATIS DENGAN CABANG IF-ELSE & LOOP
        // ==================================================================
        function renderFlowchartSVG() {
            const { inputs, logicType, condition, yesProcess, noProcess, output } = state.form;
            const shortIn = truncateText("Input: " + inputs, 26);
            const shortCond = truncateText(condition, 20);
            const shortYes = truncateText(yesProcess, 22);
            const shortNo = truncateText(noProcess, 22);
            const shortOut = truncateText("Output: " + output, 26);

            let svgHtml = "";

            if (logicType === "sequence") {
                svgHtml = `
                <svg width="320" height="370" viewBox="0 0 320 370" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1b4332"/>
                        </marker>
                    </defs>
                    <!-- START -->
                    <rect x="95" y="10" width="130" height="38" rx="19" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="160" y="34" text-anchor="middle" font-size="13" font-weight="bold" fill="#102a1d">Mulai</text>
                    <line x1="160" y1="48" x2="160" y2="78" stroke="#1b4332" stroke-width="2" marker-end="url(#arrow)"/>

                    <!-- INPUT (Jajar Genjang) -->
                    <polygon points="65,80 275,80 255,124 45,124" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="160" y="107" text-anchor="middle" font-size="12" font-weight="bold" fill="#102a1d">${escapeHtml(shortIn)}</text>
                    <line x1="160" y1="124" x2="160" y2="156" stroke="#1b4332" stroke-width="2" marker-end="url(#arrow)"/>

                    <!-- PROSES (Persegi Panjang) -->
                    <rect x="55" y="158" width="210" height="46" rx="6" fill="#f3e5c3" stroke="#1b4332" stroke-width="2"/>
                    <text x="160" y="186" text-anchor="middle" font-size="12" font-weight="bold" fill="#102a1d">${escapeHtml(shortYes)}</text>
                    <line x1="160" y1="204" x2="160" y2="236" stroke="#1b4332" stroke-width="2" marker-end="url(#arrow)"/>

                    <!-- OUTPUT (Jajar Genjang) -->
                    <polygon points="65,238 275,238 255,282 45,282" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="160" y="265" text-anchor="middle" font-size="12" font-weight="bold" fill="#102a1d">${escapeHtml(shortOut)}</text>
                    <line x1="160" y1="282" x2="160" y2="314" stroke="#1b4332" stroke-width="2" marker-end="url(#arrow)"/>

                    <!-- END -->
                    <rect x="95" y="316" width="130" height="38" rx="19" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="160" y="340" text-anchor="middle" font-size="13" font-weight="bold" fill="#102a1d">Selesai</text>
                </svg>`;
            } else if (logicType === "ifelse") {
                svgHtml = `
                <svg width="430" height="450" viewBox="0 0 430 450" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrowIf" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1b4332"/>
                        </marker>
                    </defs>
                    <!-- START -->
                    <rect x="150" y="8" width="130" height="34" rx="17" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="215" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#102a1d">Mulai</text>
                    <line x1="215" y1="42" x2="215" y2="66" stroke="#1b4332" stroke-width="2" marker-end="url(#arrowIf)"/>

                    <!-- INPUT -->
                    <polygon points="120,68 330,68 310,106 100,106" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="215" y="92" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortIn)}</text>
                    <line x1="215" y1="106" x2="215" y2="132" stroke="#1b4332" stroke-width="2" marker-end="url(#arrowIf)"/>

                    <!-- DECISION BELAH KETUPAT (IF) -->
                    <polygon points="215,134 310,180 215,226 120,180" fill="#ffe8a3" stroke="#8c5319" stroke-width="2.2"/>
                    <text x="215" y="184" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortCond)}?</text>

                    <!-- CABANG KIRI: YA (TRUE) -->
                    <polyline points="120,180 78,180 78,246" fill="none" stroke="#2d6a4f" stroke-width="2" marker-end="url(#arrowIf)"/>
                    <text x="92" y="173" font-size="11" font-weight="bold" fill="#2d6a4f">Ya</text>
                    <rect x="10" y="248" width="138" height="44" rx="6" fill="#d8f3dc" stroke="#2d6a4f" stroke-width="2"/>
                    <text x="79" y="274" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortYes)}</text>

                    <!-- CABANG KANAN: TIDAK (FALSE) -->
                    <polyline points="310,180 352,180 352,246" fill="none" stroke="#c1121f" stroke-width="2" marker-end="url(#arrowIf)"/>
                    <text x="322" y="173" font-size="11" font-weight="bold" fill="#c1121f">Tidak</text>
                    <rect x="282" y="248" width="138" height="44" rx="6" fill="#f8d7da" stroke="#c1121f" stroke-width="2"/>
                    <text x="351" y="274" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortNo)}</text>

                    <!-- MENYATU KEMBALI KE OUTPUT -->
                    <polyline points="79,292 79,324 215,324" fill="none" stroke="#1b4332" stroke-width="2"/>
                    <polyline points="351,292 351,324 215,324" fill="none" stroke="#1b4332" stroke-width="2"/>
                    <line x1="215" y1="324" x2="215" y2="346" stroke="#1b4332" stroke-width="2" marker-end="url(#arrowIf)"/>

                    <!-- OUTPUT -->
                    <polygon points="120,348 330,348 310,386 100,386" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="215" y="372" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortOut)}</text>
                    <line x1="215" y1="386" x2="215" y2="408" stroke="#1b4332" stroke-width="2" marker-end="url(#arrowIf)"/>

                    <!-- END -->
                    <rect x="150" y="410" width="130" height="34" rx="17" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="215" y="432" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#102a1d">Selesai</text>
                </svg>`;
            } else {
                // FLOWCHART PERULANGAN (LOOP BACK ARROW)
                svgHtml = `
                <svg width="390" height="460" viewBox="0 0 390 460" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrowLp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1b4332"/>
                        </marker>
                    </defs>
                    <!-- START -->
                    <rect x="130" y="8" width="130" height="34" rx="17" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="195" y="30" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#102a1d">Mulai</text>
                    <line x1="195" y1="42" x2="195" y2="66" stroke="#1b4332" stroke-width="2" marker-end="url(#arrowLp)"/>

                    <!-- INPUT & INIT i=1 -->
                    <polygon points="100,68 310,68 290,106 80,106" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="195" y="92" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortIn)} | i = 1</text>
                    <line x1="195" y1="106" x2="195" y2="132" stroke="#1b4332" stroke-width="2" marker-end="url(#arrowLp)"/>

                    <!-- DECISION KONDISI LOOP -->
                    <polygon points="195,134 285,178 195,222 105,178" fill="#ffe8a3" stroke="#8c5319" stroke-width="2.2"/>
                    <text x="195" y="182" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortCond)}?</text>

                    <!-- YA -> PROSES LOOP -> PANAH BALIK KE ATAS -->
                    <line x1="195" y1="222" x2="195" y2="252" stroke="#2d6a4f" stroke-width="2" marker-end="url(#arrowLp)"/>
                    <text x="205" y="242" font-size="11" font-weight="bold" fill="#2d6a4f">Ya</text>

                    <rect x="95" y="254" width="200" height="44" rx="6" fill="#f3e5c3" stroke="#1b4332" stroke-width="2"/>
                    <text x="195" y="274" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortYes)}</text>
                    <text x="195" y="290" text-anchor="middle" font-size="10" font-weight="bold" fill="#2d6a4f">i = i + 1</text>

                    <!-- GARIS LOOP KEMBALI KE KONDISI -->
                    <polyline points="95,276 42,276 42,178 102,178" fill="none" stroke="#2d6a4f" stroke-width="2" marker-end="url(#arrowLp)"/>
                    <text x="22" y="230" font-size="10" font-weight="bold" fill="#2d6a4f">Ulang</text>

                    <!-- TIDAK -> KELUAR LOOP KE OUTPUT -->
                    <polyline points="285,178 348,178 348,342 195,342 195,356" fill="none" stroke="#c1121f" stroke-width="2" marker-end="url(#arrowLp)"/>
                    <text x="295" y="171" font-size="11" font-weight="bold" fill="#c1121f">Tidak</text>

                    <!-- OUTPUT -->
                    <polygon points="100,358 310,358 290,394 80,394" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="195" y="381" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#102a1d">${escapeHtml(shortOut)}</text>
                    <line x1="195" y1="394" x2="195" y2="414" stroke="#1b4332" stroke-width="2" marker-end="url(#arrowLp)"/>

                    <!-- END -->
                    <rect x="130" y="416" width="130" height="34" rx="17" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="195" y="438" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#102a1d">Selesai</text>
                </svg>`;
            }

            svgContainer.innerHTML = svgHtml;
        }

        function renderJavaExplainCards() {
            explainContainer.innerHTML = "";
            (state.javaExplain || []).forEach(item => {
                const box = document.createElement("div");
                box.style.cssText = "background:var(--green-bg); border:1.5px solid var(--green-border); border-radius:12px; padding:10px 12px;";
                box.innerHTML = `
                    <code style="display:block; background:#14281d; color:#b7e4c7; padding:5px 8px; border-radius:7px; font-size:12px; margin-bottom:6px; overflow-x:auto;">${escapeHtml(item.code)}</code>
                    <span style="font-size:12.5px; color:var(--green-text); line-height:1.45; display:block;">${escapeHtml(item.desc)}</span>
                `;
                explainContainer.appendChild(box);
            });
        }

        // Event Listeners
        logicTypeEl.addEventListener("change", syncFormVisibility);

        containerEl.querySelector("#lgGenerateAllBtn").addEventListener("click", runRuleBasedGenerator);

        containerEl.querySelectorAll(".logal-preset-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const p = PRESET_EXAMPLES[btn.dataset.preset];
                if (!p) return;
                titleEl.value = p.title;
                inputsEl.value = p.inputs;
                logicTypeEl.value = p.logicType;
                condEl.value = p.condition;
                yesEl.value = p.yesProcess;
                noEl.value = p.noProcess;
                outEl.value = p.output;
                syncFormVisibility();
                runRuleBasedGenerator();
            });
        });

        // Sub-Tab Mode (Tampilkan Semua vs 1 per 1)
        containerEl.querySelectorAll(".lg-view-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                containerEl.querySelectorAll(".lg-view-btn").forEach(b => {
                    b.className = "btn-green-outline lg-view-btn";
                });
                btn.className = "btn-green-solid lg-view-btn active";

                const target = btn.dataset.view;
                const grid = containerEl.querySelector("#lgResultsGrid");
                grid.style.gridTemplateColumns = target === "all" ? "1fr 1fr" : "1fr";

                containerEl.querySelectorAll(".lg-card").forEach(card => {
                    card.style.display = (target === "all" || card.dataset.card === target) ? "block" : "none";
                });
            });
        });

        // Simpan edit manual jika kamu mengetik langsung di Notasi 1 / 3 / Java
        n1Text.addEventListener("input", async () => {
            state.notasi1 = n1Text.value;
            await saveCallback();
        });
        n3Text.addEventListener("input", async () => {
            state.notasi3 = n3Text.value;
            await saveCallback();
        });
        javaText.addEventListener("input", async () => {
            state.javaCode = javaText.value;
            await saveCallback();
        });

        // Tombol salin
        containerEl.querySelectorAll(".lg-copy-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const targetEl = containerEl.querySelector("#" + btn.dataset.target);
                if (targetEl) {
                    navigator.clipboard.writeText(targetEl.value);
                    alert("Teks berhasil disalin!");
                }
            });
        });

        // Inisialisasi pertama kali buku dibuka
        syncFormVisibility();
        if (!state.notasi1 && !state.javaCode) {
            runRuleBasedGenerator();
        } else {
            renderFlowchartSVG();
            renderJavaExplainCards();
        }
    };

    function truncateText(str, max) {
        return str.length > max ? str.slice(0, max - 2) + ".." : str;
    }

    function escapeHtml(str) {
        return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }
})();
