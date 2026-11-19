/* ==========================================================================
   MODUL LAB LOGIKA & ALGORITMA
   - Pertemuan 1 - 7 : Studio Dasar (Runtunan, If-Else, While)
   - Pertemuan 9     : Studio Perulangan FOR (exp1; exp2; exp3)
   File: js/lab-logal.js
   ========================================================================== */
(function () {
    // ======================================================================
    // PRESET PERTEMUAN 1 - 7
    // ======================================================================
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

    // ======================================================================
    // PRESET KHUSUS PERTEMUAN 9 (ALGORITMA PERULANGAN FOR)
    // ======================================================================
    const FOR_PRESETS = {
        cetak_text: {
            title: "CetakText",
            hasInputLimit: true,
            limitVar: "jumlah",
            limitPrompt: "Masukkan jumlah Text: ",
            exp1: "i = 1",
            exp2: "i <= jumlah",
            exp3: "i++",
            loopMode: "print_text",
            statementText: "\"Algoritma dan Pemrograman\"",
            useAccumulator: false,
            accFormula: "",
            finalOutput: "\"Selesai mencetak teks\""
        },
        penjumlahan: {
            title: "Penjumlahan",
            hasInputLimit: true,
            limitVar: "jumlah",
            limitPrompt: "Masukkan jumlah Bilangan: ",
            exp1: "i = 1",
            exp2: "i <= jumlah",
            exp3: "i++",
            loopMode: "input_sum",
            statementText: "Baca data ke-i, hasil = hasil + data",
            useAccumulator: true,
            accFormula: "hasil = hasil + data",
            finalOutput: "\"Hasil Penjumlahan adalah \" + hasil"
        },
        genap_10: {
            title: "SepuluhBilanganGenap",
            hasInputLimit: false,
            limitVar: "10",
            limitPrompt: "",
            exp1: "i = 1",
            exp2: "i <= 10",
            exp3: "i++",
            loopMode: "print_expr",
            statementText: "i * 2",
            useAccumulator: false,
            accFormula: "",
            finalOutput: "\"10 Bilangan Genap Pertama selesai ditampilkan\""
        },
        ganjil_10: {
            title: "JumlahSepuluhBilanganGanjil",
            hasInputLimit: false,
            limitVar: "10",
            limitPrompt: "",
            exp1: "i = 1",
            exp2: "i <= 10",
            exp3: "i++",
            loopMode: "sum_expr",
            statementText: "(2 * i) - 1",
            useAccumulator: true,
            accFormula: "hasil = hasil + ((2 * i) - 1)",
            finalOutput: "\"Jumlah 10 Bilangan Ganjil Pertama adalah \" + hasil"
        }
    };

    // ======================================================================
    // ROUTER UTAMA BERDASARKAN NOMOR PERTEMUAN
    // ======================================================================
    window.renderLogalLab = function (containerEl, meeting, saveCallback) {
        if (meeting.number === 9) {
            renderForLoopLab(containerEl, meeting, saveCallback);
        } else {
            renderBasicLogalLab(containerEl, meeting, saveCallback);
        }
    };

    // ======================================================================
    // STUDIO PERTEMUAN 9: ALGORITMA PERULANGAN FOR (COUNTED LOOP)
    // ======================================================================
    function renderForLoopLab(containerEl, meeting, saveCallback) {
        if (!meeting.forLoopStudio) {
            meeting.forLoopStudio = {
                form: { ...FOR_PRESETS.cetak_text },
                notasi1: "",
                notasi3: "",
                javaCode: "",
                javaExplain: [],
                simResult: ""
            };
        }

        const state = meeting.forLoopStudio;

        containerEl.innerHTML = `
            <div style="background:var(--green-bg); border:2.5px solid var(--green-main); border-radius:22px; padding:20px;">
                <!-- HEADER -->
                <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; padding-bottom:12px; border-bottom:2px solid var(--green-border);">
                    <div>
                        <span style="background:var(--green-main); color:#fff; font-size:11px; font-weight:700; padding:3px 10px; border-radius:10px;">COUNTED LOOP • STRUKTUR FOR (exp1; exp2; exp3)</span>
                        <h3 style="margin:6px 0 2px; color:var(--green-main); font-size:20px;">🔁 Lab Algoritma Perulangan FOR — Pertemuan ${meeting.number}</h3>
                        <p style="margin:0; font-size:13px; color:var(--green-muted);">Susun komponen <code>for(exp1; exp2; exp3)</code> untuk otomatis menghasilkan Deskriptif, Flowchart, Pseudocode, Kode Java, &amp; Simulasi Output.</p>
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center;">
                        <span style="font-size:12px; font-weight:700; color:var(--green-text);">Preset Materi:</span>
                        <button type="button" class="btn-green-outline fl-preset-btn" data-preset="cetak_text" style="padding:5px 10px; font-size:11.5px;">Contoh 1: Cetak Text</button>
                        <button type="button" class="btn-green-outline fl-preset-btn" data-preset="penjumlahan" style="padding:5px 10px; font-size:11.5px;">Contoh 2: Penjumlahan</button>
                        <button type="button" class="btn-green-outline fl-preset-btn" data-preset="genap_10" style="padding:5px 10px; font-size:11.5px;">Latihan 1: 10 Genap</button>
                        <button type="button" class="btn-green-outline fl-preset-btn" data-preset="ganjil_10" style="padding:5px 10px; font-size:11.5px;">Latihan 2: Jumlah 10 Ganjil</button>
                    </div>
                </div>

                <!-- FORM KOMPONEN FOR -->
                <div style="background:var(--green-white); border:2px solid var(--green-main); border-radius:18px; padding:16px; margin-bottom:18px;">
                    <div style="font-weight:700; color:var(--green-main); font-size:14.5px; margin-bottom:12px;">
                        ⚙️ Langkah 1: Atur Komponen Struktur Perulangan FOR
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:12px;">
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Nama Class / Program</label>
                            <input type="text" id="flTitle" value="${escapeHtml(state.form.title)}"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:700;">
                        </div>

                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Pola Kasus Perulangan</label>
                            <select id="flLoopMode" style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:700;">
                                <option value="print_text" ${state.form.loopMode === "print_text" ? "selected" : ""}>Cetak Teks Berulang (Contoh 1)</option>
                                <option value="input_sum" ${state.form.loopMode === "input_sum" ? "selected" : ""}>Input Data Dinamis &amp; Jumlahkan (Contoh 2)</option>
                                <option value="print_expr" ${state.form.loopMode === "print_expr" ? "selected" : ""}>Cetak Deret Rumus i (Latihan 1)</option>
                                <option value="sum_expr" ${state.form.loopMode === "sum_expr" ? "selected" : ""}>Hitung Total Deret Rumus i (Latihan 2)</option>
                            </select>
                        </div>

                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Batas Perulangan (Input / Tetap)</label>
                            <div style="display:flex; gap:6px;">
                                <select id="flHasInput" style="padding:8px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:700;">
                                    <option value="yes" ${state.form.hasInputLimit ? "selected" : ""}>Input Scanner</option>
                                    <option value="no" ${!state.form.hasInputLimit ? "selected" : ""}>Tetap (Konstanta)</option>
                                </select>
                                <input type="text" id="flLimitVar" value="${escapeHtml(state.form.limitVar)}" placeholder="jumlah / 10"
                                    style="width:100%; box-sizing:border-box; padding:8px 10px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:700;">
                            </div>
                        </div>
                    </div>

                    <!-- 3 KOMPONEN INTI FOR: exp1, exp2, exp3 -->
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-bottom:12px; background:var(--green-soft); padding:12px; border-radius:14px; border:1.5px solid var(--green-main);">
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; color:var(--green-deep); margin-bottom:4px;">exp1 (Inisialisasi Awal)</label>
                            <input type="text" id="flExp1" value="${escapeHtml(state.form.exp1)}" placeholder="i = 1"
                                style="width:100%; box-sizing:border-box; padding:8px 10px; border-radius:9px; border:2px solid var(--green-main); background:#fff; color:#102a1d; font-family:monospace; font-weight:700;">
                        </div>
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; color:var(--green-deep); margin-bottom:4px;">exp2 (Kondisi Boolean)</label>
                            <input type="text" id="flExp2" value="${escapeHtml(state.form.exp2)}" placeholder="i <= jumlah"
                                style="width:100%; box-sizing:border-box; padding:8px 10px; border-radius:9px; border:2px solid var(--green-main); background:#fff; color:#102a1d; font-family:monospace; font-weight:700;">
                        </div>
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; color:var(--green-deep); margin-bottom:4px;">exp3 (Increment / Decrement)</label>
                            <input type="text" id="flExp3" value="${escapeHtml(state.form.exp3)}" placeholder="i++ atau i = i + 1"
                                style="width:100%; box-sizing:border-box; padding:8px 10px; border-radius:9px; border:2px solid var(--green-main); background:#fff; color:#102a1d; font-family:monospace; font-weight:700;">
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:14px;" class="fl-two-col">
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Badan (Body) Statement di Dalam FOR</label>
                            <input type="text" id="flStatement" value="${escapeHtml(state.form.statementText)}"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Terminasi / Output Akhir Setelah Loop</label>
                            <input type="text" id="flFinalOut" value="${escapeHtml(state.form.finalOutput)}"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>
                    </div>

                    <button type="button" id="flGenerateBtn" class="btn-green-solid" style="width:100%;">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Otomatis: Deskriptif, Flowchart FOR, Pseudocode, Java &amp; Simulasi!
                    </button>
                </div>

                <!-- FILTER TAMPILAN -->
                <div style="display:flex; flex-wrap:wrap; gap:7px; margin-bottom:14px;">
                    <button type="button" class="btn-green-solid fl-view-btn active" data-view="all">📋 Semua Bagian (4-in-1)</button>
                    <button type="button" class="btn-green-outline fl-view-btn" data-view="n1">1️⃣ Notasi Deskriptif</button>
                    <button type="button" class="btn-green-outline fl-view-btn" data-view="n2">2️⃣ Flowchart FOR</button>
                    <button type="button" class="btn-green-outline fl-view-btn" data-view="n3">3️⃣ Pseudocode</button>
                    <button type="button" class="btn-green-outline fl-view-btn" data-view="java">☕ Kode Java &amp; Penjelasan</button>
                </div>

                <!-- GRID 4 HASIL -->
                <div id="flResultsGrid" style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    <!-- NOTASI 1 -->
                    <div class="fl-card" data-card="n1" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">1️⃣ Notasi 1: Algoritma Deskriptif</strong>
                            <button type="button" class="btn-green-outline fl-copy-btn" data-target="flNotasi1Text" style="padding:3px 9px; font-size:11px;">Salin</button>
                        </div>
                        <textarea id="flNotasi1Text" style="width:100%; box-sizing:border-box; min-height:240px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:inherit; font-size:13.5px; line-height:1.6; background:var(--green-bg); color:var(--green-text);">${escapeHtml(state.notasi1)}</textarea>
                    </div>

                    <!-- NOTASI 2: FLOWCHART FOR (SESUAI DIAGRAM DI MODUL) -->
                    <div class="fl-card" data-card="n2" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">2️⃣ Notasi 2: Flowchart Struktur FOR</strong>
                            <span style="font-size:11px; font-weight:700; color:var(--green-muted);">exp1 → exp2 → Statement → exp3</span>
                        </div>
                        <div id="flSvgContainer" style="background:var(--green-bg); border:2px solid var(--green-border); border-radius:12px; padding:10px; overflow-x:auto; display:flex; justify-content:center; min-height:240px;"></div>
                    </div>

                    <!-- NOTASI 3: PSEUDOCODE -->
                    <div class="fl-card" data-card="n3" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">3️⃣ Notasi 3: Pseudocode</strong>
                            <button type="button" class="btn-green-outline fl-copy-btn" data-target="flNotasi3Text" style="padding:3px 9px; font-size:11px;">Salin</button>
                        </div>
                        <textarea id="flNotasi3Text" style="width:100%; box-sizing:border-box; min-height:260px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:monospace; font-size:13px; line-height:1.55; background:var(--green-bg); color:var(--green-text);">${escapeHtml(state.notasi3)}</textarea>
                    </div>

                    <!-- KODE JAVA -->
                    <div class="fl-card" data-card="java" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">☕ Kode Program Java</strong>
                            <button type="button" class="btn-green-outline fl-copy-btn" data-target="flJavaText" style="padding:3px 9px; font-size:11px;">Salin Java</button>
                        </div>
                        <textarea id="flJavaText" style="width:100%; box-sizing:border-box; min-height:260px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:monospace; font-size:12.5px; line-height:1.5; background:#14281d; color:#e9f5db;">${escapeHtml(state.javaCode)}</textarea>
                    </div>
                </div>

                <!-- SIMULASI CONSOLE OUTPUT & BEDAH SINTAKS JAVA -->
                <div class="fl-card" data-card="java" style="display:grid; grid-template-columns: 0.9fr 1.1fr; gap:16px; margin-top:16px;" class="fl-two-col">
                    <div style="background:#14281d; color:#e9f5db; border:2px solid var(--green-main); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:#95d5b2; font-size:14px;">🖥️ Simulasi Output Console (cmd.exe)</strong>
                            <button type="button" id="flRunSimBtn" style="background:#52b788; color:#102a1d; border:none; padding:4px 10px; border-radius:8px; font-weight:700; font-size:11.5px; cursor:pointer;">▶ Jalankan</button>
                        </div>
                        <pre id="flConsoleOut" style="margin:0; font-family:monospace; font-size:12.5px; line-height:1.55; white-space:pre-wrap; color:#d8f3dc;">${escapeHtml(state.simResult)}</pre>
                    </div>

                    <div style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <strong style="display:block; color:var(--green-main); font-size:14.5px; margin-bottom:10px;">
                            🔍 Bedah Komponen &amp; Isi Kode Java
                        </strong>
                        <div id="flExplainList" style="display:flex; flex-direction:column; gap:8px;"></div>
                    </div>
                </div>
            </div>
        `;

        const styleResponsive = document.createElement("style");
        styleResponsive.textContent = `@media (max-width: 860px) { #flResultsGrid, .fl-two-col { grid-template-columns: 1fr !important; } }`;
        containerEl.appendChild(styleResponsive);

        // Referensi Elemen
        const titleEl = containerEl.querySelector("#flTitle");
        const modeEl = containerEl.querySelector("#flLoopMode");
        const hasInputEl = containerEl.querySelector("#flHasInput");
        const limitVarEl = containerEl.querySelector("#flLimitVar");
        const exp1El = containerEl.querySelector("#flExp1");
        const exp2El = containerEl.querySelector("#flExp2");
        const exp3El = containerEl.querySelector("#flExp3");
        const stmtEl = containerEl.querySelector("#flStatement");
        const finalOutEl = containerEl.querySelector("#flFinalOut");

        const n1Text = containerEl.querySelector("#flNotasi1Text");
        const n3Text = containerEl.querySelector("#flNotasi3Text");
        const javaText = containerEl.querySelector("#flJavaText");
        const svgBox = containerEl.querySelector("#flSvgContainer");
        const consoleOut = containerEl.querySelector("#flConsoleOut");
        const explainBox = containerEl.querySelector("#flExplainList");

        async function compileForLoop() {
            const title = (titleEl.value.trim() || "ProgramForLoop").replace(/[^a-zA-Z0-9_]/g, "");
            const loopMode = modeEl.value;
            const hasInputLimit = hasInputEl.value === "yes";
            const limitVar = limitVarEl.value.trim() || "10";
            const exp1 = exp1El.value.trim() || "i = 1";
            const exp2 = exp2El.value.trim() || `i <= ${limitVar}`;
            const exp3 = exp3El.value.trim() || "i++";
            const statementText = stmtEl.value.trim() || "\"Algoritma dan Pemrograman\"";
            const finalOutput = finalOutEl.value.trim() || "\"Selesai\"";

            state.form = {
                title, loopMode, hasInputLimit, limitVar,
                limitPrompt: `Masukkan ${limitVar}: `,
                exp1, exp2, exp3, statementText, finalOutput
            };

            // --------------------------------------------------------------
            // 1. NOTASI 1: ALGORITMA DESKRIPTIF (SESUAI POLA MODUL)
            // --------------------------------------------------------------
            const desc = [
                `Algoritma ${title} (Struktur Perulangan FOR):`,
                `1. Mulai`,
                hasInputLimit ? `2. Baca nilai batas perulangan (${limitVar}) dari pengguna.` : `2. Tentukan batas perulangan sebanyak ${limitVar} kali.`,
                `3. Inisialisasi nilai awal perulangan: ${exp1}.`,
                `4. Cek kondisi apakah (${exp2}):`,
                `   - Jika kondisi bernilai BENAR (true), jalankan badan perulangan: ${statementText}.`,
                `   - Lakukan pembaruan pencacah (increment/decrement): ${exp3}.`,
                `   - Kembali cek kondisi (${exp2}) secara berulang.`,
                `5. Iterasi terus dilakukan hingga kondisi (${exp2}) bernilai SALAH (false).`,
                `6. Terminasi: Tampilkan output akhir ${finalOutput}.`,
                `7. Selesai.`
            ];
            state.notasi1 = desc.join("\n");
            n1Text.value = state.notasi1;

            // --------------------------------------------------------------
            // 2. NOTASI 3: PSEUDOCODE (SESUAI NOTASI MODUL)
            // --------------------------------------------------------------
            const limitNumMatch = exp2.match(/<=\s*([a-zA-Z0-9_]+)/);
            const endBound = limitNumMatch ? limitNumMatch[1] : limitVar;
            const initValMatch = exp1.match(/=\s*([0-9]+)/);
            const startVal = initValMatch ? initValMatch[1] : "1";

            let pseudo = [
                `ALGORITMA ${title}`,
                `{ Implementasi struktur perulangan FOR (${exp1}; ${exp2}; ${exp3}) }`,
                ``,
                `DEKLARASI`,
                hasInputLimit ? `    i, ${limitVar} : integer` : `    i : integer`
            ];
            if (loopMode === "input_sum") {
                pseudo.push(`    data, hasil : integer`);
            } else if (loopMode === "sum_expr") {
                pseudo.push(`    bilangan, hasil : integer`);
            }

            pseudo.push(``, `DESKRIPSI`);
            if (loopMode === "input_sum" || loopMode === "sum_expr") {
                pseudo.push(`    hasil <- 0`);
            }
            if (hasInputLimit) {
                pseudo.push(`    read(${limitVar})`);
            }
            pseudo.push(`    for i <- ${startVal} to ${endBound} do`);
            if (loopMode === "print_text") {
                pseudo.push(`        write(${statementText})`);
            } else if (loopMode === "input_sum") {
                pseudo.push(`        read(data)`);
                pseudo.push(`        hasil <- hasil + data`);
            } else if (loopMode === "print_expr") {
                pseudo.push(`        write(${statementText})`);
            } else {
                pseudo.push(`        bilangan <- ${statementText}`);
                pseudo.push(`        hasil <- hasil + bilangan`);
            }
            pseudo.push(`    endfor`);
            pseudo.push(`    write(${finalOutput})`);
            pseudo.push(`SELESAI`);

            state.notasi3 = pseudo.join("\n");
            n3Text.value = state.notasi3;

            // --------------------------------------------------------------
            // 3. KODE JAVA & BEDAH ISI KODE
            // --------------------------------------------------------------
            let javaLines = [];
            let explain = [];

            if (hasInputLimit) {
                javaLines.push(`import java.util.Scanner;`, ``);
                explain.push({
                    code: "import java.util.Scanner;",
                    desc: "Mengimpor kelas Scanner agar program bisa membaca angka input dari keyboard."
                });
            }

            javaLines.push(`public class ${title} {`);
            javaLines.push(`    public static void main(String[] args) {`);

            if (loopMode === "print_text") {
                javaLines.push(hasInputLimit ? `        int i, ${limitVar};` : `        int i;`);
            } else if (loopMode === "input_sum") {
                javaLines.push(`        int i, data, ${limitVar}, hasil = 0;`);
            } else if (loopMode === "print_expr") {
                javaLines.push(hasInputLimit ? `        int i, ${limitVar};` : `        int i;`);
            } else {
                javaLines.push(hasInputLimit ? `        int i, bilangan, ${limitVar}, hasil = 0;` : `        int i, bilangan, hasil = 0;`);
            }

            explain.push({
                code: javaLines[javaLines.length - 1].trim(),
                desc: "Deklarasi variabel bertipe integer: 'i' sebagai pencacah loop" +
                      ((loopMode === "input_sum" || loopMode === "sum_expr") ? ", dan 'hasil = 0' sebagai penampung total penjumlahan." : ".")
            });

            if (hasInputLimit) {
                javaLines.push(`        Scanner inputan = new Scanner(System.in);`);
                javaLines.push(`        System.out.print("Masukkan ${limitVar}: ");`);
                javaLines.push(`        ${limitVar} = inputan.nextInt();`);
                explain.push({
                    code: `${limitVar} = inputan.nextInt();`,
                    desc: `Membaca angka bilangan bulat dari pengguna untuk menentukan batas akhir perulangan (${limitVar}).`
                });
            }

            javaLines.push(`        for (${exp1}; ${exp2}; ${exp3}) {`);
            if (loopMode === "print_text") {
                javaLines.push(`            System.out.println(${statementText});`);
            } else if (loopMode === "input_sum") {
                javaLines.push(`            System.out.print("Masukkan Data Ke-" + i + " : ");`);
                javaLines.push(`            data = inputan.nextInt();`);
                javaLines.push(`            hasil = hasil + data;`);
            } else if (loopMode === "print_expr") {
                javaLines.push(`            System.out.print((${statementText}) + " ");`);
            } else {
                javaLines.push(`            bilangan = ${statementText};`);
                javaLines.push(`            System.out.print(bilangan + " ");`);
                javaLines.push(`            hasil = hasil + bilangan;`);
            }
            javaLines.push(`        }`);

            explain.push({
                code: `for (${exp1}; ${exp2}; ${exp3})`,
                desc: `Header Counted Loop: exp1 (${exp1}) mengatur nilai awal, exp2 (${exp2}) mengecek syarat lanjut, exp3 (${exp3}) mengubah nilai i setiap putaran.`
            });

            if (loopMode === "print_expr" || loopMode === "sum_expr") {
                javaLines.push(`        System.out.println();`);
            }
            javaLines.push(`        System.out.println(${finalOutput});`);
            if (hasInputLimit) {
                javaLines.push(`        inputan.close();`);
            }
            javaLines.push(`    }`);
            javaLines.push(`}`);

            explain.push({
                code: `System.out.println(${finalOutput});`,
                desc: "Bagian terminasi setelah perulangan selesai untuk menampilkan kesimpulan/hasil akhir."
            });

            state.javaCode = javaLines.join("\n");
            state.javaExplain = explain;
            javaText.value = state.javaCode;

            renderForFlowchartSVG();
            renderForExplain();
            runConsoleSimulation();
            await saveCallback();
        }

        // ------------------------------------------------------------------
        // FLOWCHART SVG PERSIS SEPERTI GAMBAR DI MODUL PERTEMUAN 8/9
        // ------------------------------------------------------------------
        function renderForFlowchartSVG() {
            const { exp1, exp2, exp3, statementText, finalOutput } = state.form;
            const sExp1 = truncateText(exp1, 20);
            const sExp2 = truncateText(exp2, 18);
            const sExp3 = truncateText(exp3, 20);
            const sStmt = truncateText(statementText, 24);
            const sEndOut = truncateText(finalOutput, 24);

            svgBox.innerHTML = `
                <svg width="420" height="475" viewBox="0 0 420 475" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrFor" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1b4332"/>
                        </marker>
                    </defs>

                    <!-- START -->
                    <rect x="165" y="8" width="110" height="36" rx="18" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="220" y="31" text-anchor="middle" font-size="13" font-weight="bold" fill="#102a1d">start</text>
                    <line x1="220" y1="44" x2="220" y2="74" stroke="#1b4332" stroke-width="2" marker-end="url(#arrFor)"/>
                    <text x="198" y="63" font-size="12" font-style="italic" font-weight="bold" fill="#2d6a4f">for</text>

                    <!-- EXP 1 (INISIALISASI) -->
                    <rect x="145" y="76" width="150" height="44" rx="4" fill="#f3e5c3" stroke="#1b4332" stroke-width="2"/>
                    <text x="220" y="94" text-anchor="middle" font-size="11" fill="#5c4d3c" font-family="monospace">exp1</text>
                    <text x="220" y="111" text-anchor="middle" font-size="12" font-weight="bold" fill="#102a1d">${escapeHtml(sExp1)}</text>
                    <line x1="220" y1="120" x2="220" y2="148" stroke="#1b4332" stroke-width="2" marker-end="url(#arrFor)"/>

                    <!-- EXP 2 (KONDISI BELAH KETUPAT) -->
                    <polygon points="220,150 305,196 220,242 135,196" fill="#ffe8a3" stroke="#8c5319" stroke-width="2.2"/>
                    <text x="220" y="191" text-anchor="middle" font-size="11" fill="#5c4d3c" font-family="monospace">exp2</text>
                    <text x="220" y="208" text-anchor="middle" font-size="12" font-weight="bold" fill="#102a1d">${escapeHtml(sExp2)}</text>

                    <!-- CABANG SALAH -> END (KE KIRI SEPERTI DI MODUL) -->
                    <line x1="135" y1="196" x2="96" y2="196" stroke="#c1121f" stroke-width="2" marker-end="url(#arrFor)"/>
                    <text x="115" y="188" text-anchor="middle" font-size="11" font-weight="bold" fill="#c1121f">Salah</text>
                    <rect x="8" y="178" width="84" height="36" rx="18" fill="#f8d7da" stroke="#c1121f" stroke-width="2"/>
                    <text x="50" y="201" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#102a1d">end</text>

                    <!-- CABANG BENAR -> STATEMENT -->
                    <line x1="220" y1="242" x2="220" y2="274" stroke="#2d6a4f" stroke-width="2" marker-end="url(#arrFor)"/>
                    <text x="246" y="262" font-size="11.5" font-weight="bold" fill="#2d6a4f">Benar</text>

                    <!-- STATEMENT (INPUT/OUTPUT/PROSES) -->
                    <polygon points="135,276 325,276 305,320 115,320" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="220" y="303" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#102a1d">${escapeHtml(sStmt)}</text>
                    <line x1="220" y1="320" x2="220" y2="350" stroke="#1b4332" stroke-width="2" marker-end="url(#arrFor)"/>

                    <!-- EXP 3 (INCREMENT / DECREMENT) -->
                    <rect x="145" y="352" width="150" height="44" rx="4" fill="#f3e5c3" stroke="#1b4332" stroke-width="2"/>
                    <text x="220" y="370" text-anchor="middle" font-size="11" fill="#5c4d3c" font-family="monospace">exp3</text>
                    <text x="220" y="387" text-anchor="middle" font-size="12" font-weight="bold" fill="#102a1d">${escapeHtml(sExp3)}</text>

                    <!-- GARIS LOOP KEMBALI KE EXP 2 (SISI KANAN) -->
                    <polyline points="295,374 375,374 375,196 308,196" fill="none" stroke="#2d6a4f" stroke-width="2" marker-end="url(#arrFor)"/>
                    <text x="383" y="290" font-size="10.5" font-weight="bold" fill="#2d6a4f" transform="rotate(90 383,290)">Loop Ulang</text>

                    <!-- KETERANGAN OUTPUT TERMINASI DI BAWAH -->
                    <rect x="75" y="422" width="290" height="36" rx="10" fill="#ffffff" stroke="#74c69d" stroke-width="1.8"/>
                    <text x="220" y="444" text-anchor="middle" font-size="11" font-weight="bold" fill="#1b4332">Terminasi: ${escapeHtml(sEndOut)}</text>
                </svg>
            `;
        }

        function renderForExplain() {
            explainBox.innerHTML = "";
            (state.javaExplain || []).forEach(item => {
                const row = document.createElement("div");
                row.style.cssText = "background:var(--green-bg); border:1.5px solid var(--green-border); border-radius:10px; padding:8px 10px;";
                row.innerHTML = `
                    <code style="display:block; background:#14281d; color:#b7e4c7; padding:4px 7px; border-radius:6px; font-size:11.5px; margin-bottom:4px; overflow-x:auto;">${escapeHtml(item.code)}</code>
                    <span style="font-size:12px; color:var(--green-text); line-height:1.4; display:block;">${escapeHtml(item.desc)}</span>
                `;
                explainBox.appendChild(row);
            });
        }

        function runConsoleSimulation() {
            const { loopMode, hasInputLimit, limitVar, statementText } = state.form;
            const n = hasInputLimit ? 5 : (parseInt(limitVar, 10) || 10);
            let lines = [];

            if (loopMode === "print_text") {
                if (hasInputLimit) lines.push(`Masukkan ${limitVar}: ${n}`);
                const cleanTxt = statementText.replace(/^"|"$/g, "");
                for (let i = 1; i <= Math.min(n, 15); i++) {
                    lines.push(cleanTxt);
                }
            } else if (loopMode === "input_sum") {
                const sampleData = [2, 3, 1, 5, 7, 4, 6];
                lines.push(`Masukkan ${limitVar}: ${n}`);
                let sum = 0;
                for (let i = 1; i <= Math.min(n, 7); i++) {
                    const val = sampleData[(i - 1) % sampleData.length];
                    lines.push(`Masukkan Data Ke-${i} : ${val}`);
                    sum += val;
                }
                lines.push(`Hasil Penjumlahan adalah ${sum}`);
            } else if (loopMode === "print_expr") {
                let nums = [];
                for (let i = 1; i <= Math.min(n, 20); i++) {
                    nums.push(i * 2);
                }
                lines.push(nums.join(" "));
                lines.push(`10 Bilangan Genap Pertama selesai ditampilkan`);
            } else {
                let nums = [];
                let sum = 0;
                for (let i = 1; i <= Math.min(n, 20); i++) {
                    const odd = (2 * i) - 1;
                    nums.push(odd);
                    sum += odd;
                }
                lines.push(nums.join(" "));
                lines.push(`Jumlah 10 Bilangan Ganjil Pertama adalah ${sum}`);
            }

            state.simResult = lines.join("\n");
            consoleOut.textContent = state.simResult;
        }

        // Event Listeners Pertemuan 9
        containerEl.querySelector("#flGenerateBtn").addEventListener("click", compileForLoop);
        containerEl.querySelector("#flRunSimBtn").addEventListener("click", runConsoleSimulation);

        containerEl.querySelectorAll(".fl-preset-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const p = FOR_PRESETS[btn.dataset.preset];
                if (!p) return;
                titleEl.value = p.title;
                modeEl.value = p.loopMode;
                hasInputEl.value = p.hasInputLimit ? "yes" : "no";
                limitVarEl.value = p.limitVar;
                exp1El.value = p.exp1;
                exp2El.value = p.exp2;
                exp3El.value = p.exp3;
                stmtEl.value = p.statementText;
                finalOutEl.value = p.finalOutput;
                compileForLoop();
            });
        });

        containerEl.querySelectorAll(".fl-view-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                containerEl.querySelectorAll(".fl-view-btn").forEach(b => b.className = "btn-green-outline fl-view-btn");
                btn.className = "btn-green-solid fl-view-btn active";
                const target = btn.dataset.view;
                const grid = containerEl.querySelector("#flResultsGrid");
                grid.style.gridTemplateColumns = target === "all" ? "1fr 1fr" : "1fr";
                containerEl.querySelectorAll(".fl-card").forEach(card => {
                    card.style.display = (target === "all" || card.dataset.card === target) ? "block" : "none";
                });
            });
        });

        n1Text.addEventListener("input", async () => { state.notasi1 = n1Text.value; await saveCallback(); });
        n3Text.addEventListener("input", async () => { state.notasi3 = n3Text.value; await saveCallback(); });
        javaText.addEventListener("input", async () => { state.javaCode = javaText.value; await saveCallback(); });

        containerEl.querySelectorAll(".fl-copy-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const el = containerEl.querySelector("#" + btn.dataset.target);
                if (el) {
                    navigator.clipboard.writeText(el.value);
                    alert("Teks berhasil disalin!");
                }
            });
        });

        if (!state.notasi1 && !state.javaCode) {
            compileForLoop();
        } else {
            renderForFlowchartSVG();
            renderForExplain();
            consoleOut.textContent = state.simResult || "";
        }
    }

    // ======================================================================
    // STUDIO PERTEMUAN 1 - 7 (TETAP SAMA SEPERTI SEBELUMNYA)
    // ======================================================================
    function renderBasicLogalLab(containerEl, meeting, saveCallback) {
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

                <div style="background:var(--green-white); border:2px solid var(--green-main); border-radius:18px; padding:16px; margin-bottom:18px;">
                    <div style="font-weight:700; color:var(--green-main); font-size:14.5px; margin-bottom:12px;">
                        ✨ Langkah 1: Masukkan Soal / Logika Program
                    </div>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap:12px; margin-bottom:12px;">
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Nama Program / Judul</label>
                            <input type="text" id="lgTitle" value="${escapeHtml(state.form.title)}"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Variabel Input &amp; Tipe Data</label>
                            <input type="text" id="lgInputs" value="${escapeHtml(state.form.inputs)}"
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
                            <input type="text" id="lgCondition" value="${escapeHtml(state.form.condition)}"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>
                        <div>
                            <label id="lgYesLabel" style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Proses Jika YA / Proses Utama</label>
                            <input type="text" id="lgYesProcess" value="${escapeHtml(state.form.yesProcess)}"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>
                        <div id="lgNoWrap">
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Proses Jika TIDAK (ELSE)</label>
                            <input type="text" id="lgNoProcess" value="${escapeHtml(state.form.noProcess)}"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>
                        <div>
                            <label style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">Output yang Ditampilkan</label>
                            <input type="text" id="lgOutput" value="${escapeHtml(state.form.output)}"
                                style="width:100%; box-sizing:border-box; padding:8px 11px; border-radius:10px; border:2px solid var(--green-border); background:var(--green-bg); color:var(--green-text); font-weight:600;">
                        </div>
                    </div>
                    <button type="button" id="lgGenerateAllBtn" class="btn-green-solid" style="width:100%;">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Otomatis: Notasi 1, Flowchart, Pseudocode &amp; Java!
                    </button>
                </div>

                <div style="display:flex; flex-wrap:wrap; gap:7px; margin-bottom:14px;">
                    <button type="button" class="btn-green-solid lg-view-btn active" data-view="all">📋 Tampilkan Semua (4-in-1)</button>
                    <button type="button" class="btn-green-outline lg-view-btn" data-view="n1">1️⃣ Notasi Deskriptif</button>
                    <button type="button" class="btn-green-outline lg-view-btn" data-view="n2">2️⃣ Notasi Flowchart</button>
                    <button type="button" class="btn-green-outline lg-view-btn" data-view="n3">3️⃣ Notasi Pseudocode</button>
                    <button type="button" class="btn-green-outline lg-view-btn" data-view="java">☕ Kode Java &amp; Penjelasan</button>
                </div>

                <div id="lgResultsGrid" style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    <div class="lg-card" data-card="n1" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">1️⃣ Notasi 1: Deskriptif</strong>
                            <button type="button" class="btn-green-outline lg-copy-btn" data-target="lgNotasi1Text" style="padding:3px 9px; font-size:11px;">Salin</button>
                        </div>
                        <textarea id="lgNotasi1Text" style="width:100%; box-sizing:border-box; min-height:220px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:inherit; font-size:13.5px; line-height:1.6; background:var(--green-bg); color:var(--green-text);">${escapeHtml(state.notasi1)}</textarea>
                    </div>
                    <div class="lg-card" data-card="n2" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">2️⃣ Notasi 2: Flowchart (Auto-Branching)</strong>
                            <span style="font-size:11px; font-weight:700; color:var(--green-muted);">Simbol Standar ISO</span>
                        </div>
                        <div id="lgFlowSvgContainer" style="background:var(--green-bg); border:2px solid var(--green-border); border-radius:12px; padding:10px; overflow-x:auto; display:flex; justify-content:center; min-height:220px;"></div>
                    </div>
                    <div class="lg-card" data-card="n3" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">3️⃣ Notasi 3: Pseudocode</strong>
                            <button type="button" class="btn-green-outline lg-copy-btn" data-target="lgNotasi3Text" style="padding:3px 9px; font-size:11px;">Salin</button>
                        </div>
                        <textarea id="lgNotasi3Text" style="width:100%; box-sizing:border-box; min-height:250px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:monospace; font-size:13px; line-height:1.55; background:var(--green-bg); color:var(--green-text);">${escapeHtml(state.notasi3)}</textarea>
                    </div>
                    <div class="lg-card" data-card="java" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong style="color:var(--green-main); font-size:15px;">☕ Kode Program Java</strong>
                            <button type="button" class="btn-green-outline lg-copy-btn" data-target="lgJavaText" style="padding:3px 9px; font-size:11px;">Salin Java</button>
                        </div>
                        <textarea id="lgJavaText" style="width:100%; box-sizing:border-box; min-height:250px; border:2px solid var(--green-border); border-radius:12px; padding:11px; font-family:monospace; font-size:12.5px; line-height:1.5; background:#14281d; color:#e9f5db;">${escapeHtml(state.javaCode)}</textarea>
                    </div>
                </div>

                <div class="lg-card" data-card="java" style="background:var(--green-white); border:2px solid var(--green-border); border-radius:18px; padding:16px; margin-top:16px;">
                    <strong style="display:block; color:var(--green-main); font-size:15px; margin-bottom:10px;">🔍 Bedah Sintaks &amp; Penjelasan Isi Kode Java</strong>
                    <div id="lgJavaExplainList" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:10px;"></div>
                </div>
            </div>
        `;

        const styleEl = document.createElement("style");
        styleEl.textContent = `@media (max-width: 860px) { #lgResultsGrid { grid-template-columns: 1fr !important; } }`;
        containerEl.appendChild(styleEl);

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
            return rawInputs.split(",").map(s => s.trim()).filter(Boolean).map(item => {
                const match = item.match(/^([a-zA-Z0-9_]+)\s*(?:\(([^)]+)\))?$/);
                if (match) return { name: match[1], type: (match[2] || "int").trim() };
                return { name: item.replace(/\s+/g, "_"), type: "int" };
            });
        }

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

            let descLines = [
                `Judul Algoritma: ${title}`,
                `1. Mulai program.`,
                `2. Siapkan variabel input: ${parsedVars.map(v => `${v.name} bertipe ${v.type}`).join(", ")}.`,
                `3. Masukkan (input) nilai ${varNamesStr} dari pengguna.`
            ];
            if (logicType === "sequence") {
                descLines.push(`4. Lakukan proses perhitungan: ${yesProc}.`, `5. Tampilkan hasil output berupa ${output}.`, `6. Selesai.`);
            } else if (logicType === "ifelse") {
                descLines.push(`4. Periksa kondisi apakah (${condition}):`, `   a. Jika BENAR (Ya): ${yesProc}.`, `   b. Jika SALAH (Tidak): ${noProc}.`, `5. Tampilkan hasil output berupa ${output}.`, `6. Selesai.`);
            } else {
                descLines.push(`4. Inisialisasi i = 1.`, `5. Selama (${condition}) benar, jalankan ${yesProc} dan i = i + 1.`, `6. Tampilkan ${output}.`, `7. Selesai.`);
            }
            state.notasi1 = descLines.join("\n");
            n1Text.value = state.notasi1;

            let pseudoLines = [`ALGORITMA ${title}`, ``, `DEKLARASI`];
            parsedVars.forEach(v => pseudoLines.push(`    ${v.name} : ${v.type}`));
            if (logicType === "loop") pseudoLines.push(`    i : integer`);
            pseudoLines.push(``, `DESKRIPSI`);
            parsedVars.forEach(v => pseudoLines.push(`    BACA(${v.name})`));
            if (logicType === "sequence") {
                pseudoLines.push(`    ${yesProc.replace(/=/g, "<-")}`);
            } else if (logicType === "ifelse") {
                pseudoLines.push(`    JIKA (${condition}) MAKA`, `        ${yesProc.replace(/=/g, "<-")}`, `    LAINNYA`, `        ${noProc.replace(/=/g, "<-")}`, `    AKHIR_JIKA`);
            } else {
                pseudoLines.push(`    i <- 1`, `    SELAMA (${condition}) LAKUKAN`, `        ${yesProc}`, `        i <- i + 1`, `    AKHIR_SELAMA`);
            }
            pseudoLines.push(`    TULIS(${output})`, `SELESAI`);
            state.notasi3 = pseudoLines.join("\n");
            n3Text.value = state.notasi3;

            const className = title.replace(/[^a-zA-Z0-9_]/g, "");
            let javaLines = [`import java.util.Scanner;`, ``, `public class ${className} {`, `    public static void main(String[] args) {`, `        Scanner input = new Scanner(System.in);`];
            let explainItems = [{ code: "Scanner input = new Scanner(System.in);", desc: "Membuat objek Scanner untuk membaca input dari keyboard." }];

            parsedVars.forEach(v => {
                const jType = v.type.toLowerCase() === "string" ? "String" : v.type.toLowerCase() === "double" ? "double" : "int";
                const readMethod = jType === "String" ? "nextLine()" : jType === "double" ? "nextDouble()" : "nextInt()";
                javaLines.push(`        System.out.print("Masukkan ${v.name}: ");`, `        ${jType} ${v.name} = input.${readMethod};`);
            });

            const outVarClean = output.replace(/[^a-zA-Z0-9_]/g, "");
            if (!output.startsWith("\"") && outVarClean && !parsedVars.some(v => v.name === outVarClean)) {
                const outType = (yesProc.includes("\"") || noProc.includes("\"")) ? "String" : "double";
                javaLines.push(`        ${outType} ${outVarClean};`);
            }

            if (logicType === "sequence") {
                javaLines.push(`        ${yesProc};`);
            } else if (logicType === "ifelse") {
                javaLines.push(`        if (${condition}) {`, `            ${yesProc};`, `        } else {`, `            ${noProc};`, `        }`);
                explainItems.push({ code: `if (${condition}) { ... } else { ... }`, desc: `Percabangan dua arah berdasarkan syarat (${condition}).` });
            } else {
                javaLines.push(`        int i = 1;`, `        while (${condition}) {`, `            System.out.println("Iterasi ke-" + i);`, `            i++;`, `        }`);
            }
            javaLines.push(`        System.out.println("Hasil: " + ${output});`, `        input.close();`, `    }`, `}`);

            state.javaCode = javaLines.join("\n");
            state.javaExplain = explainItems;
            javaText.value = state.javaCode;

            renderBasicSvg();
            renderBasicExplain();
            await saveCallback();
        }

        function renderBasicSvg() {
            const { inputs, logicType, condition, yesProcess, noProcess, output } = state.form;
            if (logicType === "ifelse") {
                svgContainer.innerHTML = `<svg width="400" height="410" viewBox="0 0 400 410" xmlns="http://www.w3.org/2000/svg">
                    <rect x="140" y="8" width="120" height="32" rx="16" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="200" y="29" text-anchor="middle" font-size="12" font-weight="bold">Mulai</text>
                    <line x1="200" y1="40" x2="200" y2="62" stroke="#1b4332" stroke-width="2"/>
                    <polygon points="110,62 310,62 290,96 90,96" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="200" y="83" text-anchor="middle" font-size="11" font-weight="bold">${escapeHtml(truncateText("Input: " + inputs, 24))}</text>
                    <line x1="200" y1="96" x2="200" y2="118" stroke="#1b4332" stroke-width="2"/>
                    <polygon points="200,118 290,162 200,206 110,162" fill="#ffe8a3" stroke="#8c5319" stroke-width="2"/>
                    <text x="200" y="166" text-anchor="middle" font-size="11" font-weight="bold">${escapeHtml(truncateText(condition, 18))}?</text>
                    <polyline points="110,162 70,162 70,224" fill="none" stroke="#2d6a4f" stroke-width="2"/>
                    <rect x="10" y="224" width="125" height="40" rx="6" fill="#d8f3dc" stroke="#2d6a4f" stroke-width="2"/>
                    <text x="72" y="248" text-anchor="middle" font-size="10" font-weight="bold">${escapeHtml(truncateText(yesProcess, 20))}</text>
                    <polyline points="290,162 330,162 330,224" fill="none" stroke="#c1121f" stroke-width="2"/>
                    <rect x="265" y="224" width="125" height="40" rx="6" fill="#f8d7da" stroke="#c1121f" stroke-width="2"/>
                    <text x="327" y="248" text-anchor="middle" font-size="10" font-weight="bold">${escapeHtml(truncateText(noProcess, 20))}</text>
                    <polyline points="72,264 72,292 200,292" fill="none" stroke="#1b4332" stroke-width="2"/>
                    <polyline points="327,264 327,292 200,292" fill="none" stroke="#1b4332" stroke-width="2"/>
                    <line x1="200" y1="292" x2="200" y2="314" stroke="#1b4332" stroke-width="2"/>
                    <polygon points="110,314 310,314 290,348 90,348" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="200" y="335" text-anchor="middle" font-size="11" font-weight="bold">${escapeHtml(truncateText("Output: " + output, 24))}</text>
                    <line x1="200" y1="348" x2="200" y2="368" stroke="#1b4332" stroke-width="2"/>
                    <rect x="140" y="368" width="120" height="32" rx="16" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="200" y="389" text-anchor="middle" font-size="12" font-weight="bold">Selesai</text>
                </svg>`;
            } else {
                svgContainer.innerHTML = `<svg width="310" height="340" viewBox="0 0 310 340" xmlns="http://www.w3.org/2000/svg">
                    <rect x="95" y="10" width="120" height="34" rx="17" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="155" y="32" text-anchor="middle" font-size="12" font-weight="bold">Mulai</text>
                    <line x1="155" y1="44" x2="155" y2="74" stroke="#1b4332" stroke-width="2"/>
                    <polygon points="65,74 265,74 245,114 45,114" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="155" y="99" text-anchor="middle" font-size="11" font-weight="bold">${escapeHtml(truncateText("Input: " + inputs, 24))}</text>
                    <line x1="155" y1="114" x2="155" y2="144" stroke="#1b4332" stroke-width="2"/>
                    <rect x="55" y="144" width="200" height="44" rx="6" fill="#f3e5c3" stroke="#1b4332" stroke-width="2"/>
                    <text x="155" y="170" text-anchor="middle" font-size="11" font-weight="bold">${escapeHtml(truncateText(yesProcess, 24))}</text>
                    <line x1="155" y1="188" x2="155" y2="218" stroke="#1b4332" stroke-width="2"/>
                    <polygon points="65,218 265,218 245,258 45,258" fill="#cddce6" stroke="#1b4332" stroke-width="2"/>
                    <text x="155" y="243" text-anchor="middle" font-size="11" font-weight="bold">${escapeHtml(truncateText("Output: " + output, 24))}</text>
                    <line x1="155" y1="258" x2="155" y2="288" stroke="#1b4332" stroke-width="2"/>
                    <rect x="95" y="288" width="120" height="34" rx="17" fill="#d8f3dc" stroke="#1b4332" stroke-width="2"/>
                    <text x="155" y="310" text-anchor="middle" font-size="12" font-weight="bold">Selesai</text>
                </svg>`;
            }
        }

        function renderBasicExplain() {
            explainContainer.innerHTML = "";
            (state.javaExplain || []).forEach(item => {
                const box = document.createElement("div");
                box.style.cssText = "background:var(--green-bg); border:1.5px solid var(--green-border); border-radius:12px; padding:10px 12px;";
                box.innerHTML = `<code style="display:block; background:#14281d; color:#b7e4c7; padding:5px 8px; border-radius:7px; font-size:12px; margin-bottom:6px;">${escapeHtml(item.code)}</code><span style="font-size:12.5px; color:var(--green-text);">${escapeHtml(item.desc)}</span>`;
                explainContainer.appendChild(box);
            });
        }

        logicTypeEl.addEventListener("change", syncFormVisibility);
        containerEl.querySelector("#lgGenerateAllBtn").addEventListener("click", runRuleBasedGenerator);
        containerEl.querySelectorAll(".logal-preset-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const p = PRESET_EXAMPLES[btn.dataset.preset];
                if (!p) return;
                titleEl.value = p.title; inputsEl.value = p.inputs; logicTypeEl.value = p.logicType;
                condEl.value = p.condition; yesEl.value = p.yesProcess; noEl.value = p.noProcess; outEl.value = p.output;
                syncFormVisibility(); runRuleBasedGenerator();
            });
        });
        containerEl.querySelectorAll(".lg-view-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                containerEl.querySelectorAll(".lg-view-btn").forEach(b => b.className = "btn-green-outline lg-view-btn");
                btn.className = "btn-green-solid lg-view-btn active";
                const target = btn.dataset.view;
                containerEl.querySelector("#lgResultsGrid").style.gridTemplateColumns = target === "all" ? "1fr 1fr" : "1fr";
                containerEl.querySelectorAll(".lg-card").forEach(card => {
                    card.style.display = (target === "all" || card.dataset.card === target) ? "block" : "none";
                });
            });
        });
        n1Text.addEventListener("input", async () => { state.notasi1 = n1Text.value; await saveCallback(); });
        n3Text.addEventListener("input", async () => { state.notasi3 = n3Text.value; await saveCallback(); });
        javaText.addEventListener("input", async () => { state.javaCode = javaText.value; await saveCallback(); });
        containerEl.querySelectorAll(".lg-copy-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const targetEl = containerEl.querySelector("#" + btn.dataset.target);
                if (targetEl) { navigator.clipboard.writeText(targetEl.value); alert("Teks berhasil disalin!"); }
            });
        });

        syncFormVisibility();
        if (!state.notasi1 && !state.javaCode) runRuleBasedGenerator();
        else { renderBasicSvg(); renderBasicExplain(); }
    }

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
