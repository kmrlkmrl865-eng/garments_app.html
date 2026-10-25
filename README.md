# garments_app.html<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>রিলায়েন্স গার্মেন্টস কাটিং ও সাপ্লাই প্রসেস ম্যানেজার (A-Z)</title>
    <style>
        :root {
            --primary: #1e3a8a;
            --primary-light: #3b82f6;
            --secondary: #0f766e;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text: #1e293b;
            --border: #e2e8f0;
            --success: #16a34a;
            --danger: #dc2626;
            --warning: #d97706;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: var(--bg); color: var(--text); padding-bottom: 40px; }
        header { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 15px 20px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        header h1 { font-size: 1.4rem; margin-bottom: 5px; }
        header p { font-size: 0.85rem; opacity: 0.9; }
        .container { max-width: 1000px; margin: 15px auto; padding: 0 12px; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 15px; }
        .dash-card { background: var(--card-bg); padding: 12px; border-radius: 8px; border-left: 4px solid var(--primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
        .dash-card h4 { font-size: 0.75rem; color: #64748b; margin-bottom: 4px; }
        .dash-card .number { font-size: 1.2rem; font-weight: bold; color: var(--primary); }
        .nav-tabs { display: flex; overflow-x: auto; gap: 6px; padding-bottom: 8px; margin-bottom: 15px; border-bottom: 2px solid var(--border); }
        .tab-btn { background: #e2e8f0; border: none; padding: 8px 14px; font-size: 0.85rem; font-weight: 600; border-radius: 6px; cursor: pointer; white-space: nowrap; color: #475569; }
        .tab-btn.active { background: var(--primary); color: white; }
        .card { background: var(--card-bg); padding: 15px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 15px; border: 1px solid var(--border); }
        .card h3 { font-size: 1.1rem; color: var(--primary); margin-bottom: 12px; border-bottom: 1px solid var(--border); padding-bottom: 6px; display: flex; justify-content: space-between; align-items: center; }
        .form-group { margin-bottom: 10px; }
        .form-group label { display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px; color: #334155; }
        .form-control { width: 100%; padding: 8px 10px; font-size: 0.9rem; border: 1px solid var(--border); border-radius: 6px; outline: none; }
        .form-control:focus { border-color: var(--primary-light); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .btn { width: 100%; padding: 10px; border: none; border-radius: 6px; font-size: 0.9rem; font-weight: bold; cursor: pointer; color: white; margin-top: 5px; }
        .btn-primary { background: var(--primary); }
        .btn-success { background: var(--success); }
        .btn-secondary { background: #64748b; }
        .calc-box { background: #eff6ff; border: 1px dashed var(--primary-light); padding: 10px; border-radius: 6px; text-align: center; margin: 10px 0; font-weight: bold; color: var(--primary); }
        table { width: 100%; border-collapse: collapse; font-size: 0.8rem; margin-top: 10px; }
        th, td { border: 1px solid var(--border); padding: 6px 8px; text-align: left; }
        th { background: #f1f5f9; color: #334155; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .action-btns { display: flex; gap: 10px; margin-top: 15px; }
        .badge { display: inline-block; padding: 2px 6px; font-size: 0.7rem; border-radius: 4px; font-weight: bold; }
        .badge-success { background: #dcfce7; color: #15803d; }
        .badge-warning { background: #fef3c7; color: #b45309; }
    </style>
</head>
<body>

    <header>
        <h1>রিলায়েন্স গার্মেন্টস কাটিং প্রসেস ম্যানেজার (A-Z)</h1>
        <p>ফ্যাব্রিক রিসিভ থেকে সুইং ফিডিং — সম্পূর্ণ ডিজিটাল ট্র্যাকার</p>
    </header>

    <div class="container">
        <!-- মাস্টার ড্যাশবোর্ড -->
        <div class="dashboard-grid">
            <div class="dash-card">
                <h4>মোট ফ্যাব্রিক (গজ)</h4>
                <div class="number" id="dashFabric">০</div>
            </div>
            <div class="dash-card">
                <h4>মোট কাটা (পিস)</h4>
                <div class="number" id="dashCut">০</div>
            </div>
            <div class="dash-card">
                <h4>রিকাট / Re-cut</h4>
                <div class="number" id="dashRecut" style="color:var(--danger)">০</div>
            </div>
            <div class="dash-card">
                <h4>সুইং সাপ্লাই</h4>
                <div class="number" id="dashSupply" style="color:var(--success)">০</div>
            </div>
        </div>

        <!-- নেভিগেশন ট্যাব -->
        <div class="nav-tabs">
            <button class="tab-btn active" onclick="switchTab('fabric')">১. ফ্যাব্রিক & রিল্যাক্স</button>
            <button class="tab-btn" onclick="switchTab('marker')">২. মার্কার & লে</button>
            <button class="tab-btn" onclick="switchTab('cutting')">৩. কাটিং টিম</button>
            <button class="tab-btn" onclick="switchTab('bundle')">৪. বান্ডেল & রিকাট</button>
            <button class="tab-btn" onclick="switchTab('print')">৫. প্রিন্ট/এমব্রয়ডারি</button>
            <button class="tab-btn" onclick="switchTab('supply')">৬. সুইং সাপ্লাই</button>
            <button class="tab-btn" onclick="switchTab('scrap')">৭. ওয়েস্টেজ & ঝুট</button>
        </div>

        <!-- ১. ফ্যাব্রিক রিসিভ & রিল্যাক্সিং -->
        <div id="tab-fabric" class="tab-content active">
            <div class="card">
                <h3>ফ্যাব্রিক রিসিভ ও কন্ডিশনিং এন্ট্রি</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>বায়ার / স্টাইল</label>
                        <input type="text" id="fabStyle" class="form-control" placeholder="যেমন: Style 101">
                    </div>
                    <div class="form-group">
                        <label>ফ্যাব্রিক টাইপ / শেইড</label>
                        <input type="text" id="fabShade" class="form-control" placeholder="A, B, C Shade">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>রোল সংখ্যা</label>
                        <input type="number" id="fabRolls" class="form-control" placeholder="কয়টি রোল">
                    </div>
                    <div class="form-group">
                        <label>পরিমাণ (গজ/কেজি)</label>
                        <input type="number" id="fabQty" class="form-control" placeholder="মোট পরিমাণ">
                    </div>
                </div>
                <div class="form-group">
                    <label>রিল্যাক্সিং সময় (ঘণ্টা)</label>
                    <input type="number" id="fabRelax" class="form-control" placeholder="কত ঘণ্টা ঝুলিয়ে রাখা হলো">
                </div>
                <button class="btn btn-primary" onclick="addFabric()">ফ্যাব্রিক এন্ট্রি সেভ করুন</button>
            </div>
            <div class="card">
                <h3>ফ্যাব্রিক স্টক তালিকা</h3>
                <table>
                    <thead><tr><th>স্টাইল</th><th>শেইড</th><th>রোল</th><th>পরিমাণ</th><th>রিল্যাক্স</th></tr></thead>
                    <tbody id="listFabric"></tbody>
                </table>
            </div>
        </div>

        <!-- ২. মার্কার & লে (Spreading) -->
        <div id="tab-marker" class="tab-content">
            <div class="card">
                <h3>মার্কার ও লেয়ার ক্যালকুলেটর</h3>
                <div class="form-group">
                    <label>মার্কারের নাম / স্টাইল</label>
                    <input type="text" id="mStyle" class="form-control" placeholder="যেমন: T-Shirt Front">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>মার্কার কত পিসের?</label>
                        <input type="number" id="mPcs" class="form-control" placeholder="যেমন: 12" oninput="calcMarker()">
                    </div>
                    <div class="form-group">
                        <label>কত লেয়ার/প্লাই দিলেন?</label>
                        <input type="number" id="mLayers" class="form-control" placeholder="যেমন: 150" oninput="calcMarker()">
                    </div>
                </div>
                <div class="calc-box" id="markerResult">অটো মোট বডি: ০ পিস</div>
                <button class="btn btn-primary" onclick="addMarker()">মার্কার লেয়ার সেভ করুন</button>
            </div>
            <div class="card">
                <h3>লেয়ার ট্র্যাকিং রেকর্ড</h3>
                <table>
                    <thead><tr><th>স্টাইল</th><th>মার্কার পিস</th><th>লেয়ার</th><th>মোট বডি</th></tr></thead>
                    <tbody id="listMarker"></tbody>
                </table>
            </div>
        </div>

        <!-- ৩. কাটিং টিম আউটপুট -->
        <div id="tab-cutting" class="tab-content">
            <div class="card">
                <h3>কাটিং টিম দৈনিক আউটপুট</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>কাটিং টিমের নাম</label>
                        <select id="cutTeam" class="form-control">
                            <option>মুন্না টিম</option>
                            <option>আলাউদ্দিন টিম</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>কাটা মালের পরিমাণ (পিস)</label>
                        <input type="number" id="cutPcs" class="form-control" placeholder="কত পিস কাটলো">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="addCutting()">কাটিং এন্ট্রি সেভ করুন</button>
            </div>
            <div class="card">
                <h3>টিম কাটিং রেকর্ড</h3>
                <table>
                    <thead><tr><th>টিম</th><th>পরিমাণ (পিস)</th><th>তারিখ</th></tr></thead>
                    <tbody id="listCutting"></tbody>
                </table>
            </div>
        </div>

        <!-- ৪. বান্ডেল & রিকাট (QC) -->
        <div id="tab-bundle" class="tab-content">
            <div class="card">
                <h3>বান্ডেল নাম্বারিং ও রিকাট (Re-cut)</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>বান্ডেল নম্বর (হতে-পর্যন্ত)</label>
                        <input type="text" id="bNo" class="form-control" placeholder="১ - ২০">
                    </div>
                    <div class="form-group">
                        <label>পুনরায় কাটা / Re-cut (পিস)</label>
                        <input type="number" id="bRecut" class="form-control" placeholder="ত্রুটিযুক্ত বডি পুনরায় কাটা">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="addBundle()">বান্ডেল ও রিকাট জমা দিন</button>
            </div>
            <div class="card">
                <h3>বান্ডেল ও QC রিকাট তালিকা</h3>
                <table>
                    <thead><tr><th>বান্ডেল নং</th><th>রিকাট (Re-cut)</th></tr></thead>
                    <tbody id="listBundle"></tbody>
                </table>
            </div>
        </div>

        <!-- ৫. প্রিন্ট & এমব্রয়ডারি -->
        <div id="tab-print" class="tab-content">
            <div class="card">
                <h3>প্রিন্টিং ও এমব্রয়ডারি চালানের হিসাব</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>পাঠানো বডি (পিস)</label>
                        <input type="number" id="prSent" class="form-control" placeholder="কত পিস পাঠালেন">
                    </div>
                    <div class="form-group">
                        <label>ফেরত আসা বডি (পিস)</label>
                        <input type="number" id="prRec" class="form-control" placeholder="কত পিস ফেরত আসলো">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="addPrint()">চালান সেভ করুন</button>
            </div>
            <div class="card">
                <h3>প্রিন্ট / এমব্রয়ডারি লগ</h3>
                <table>
                    <thead><tr><th>পাঠানো</th><th>ফেরত</th><th>ব্যবধন</th></tr></thead>
                    <tbody id="listPrint"></tbody>
                </table>
            </div>
        </div>

        <!-- ৬. সুইং ফ্লোরে সাপ্লাই -->
        <div id="tab-supply" class="tab-content">
            <div class="card">
                <h3>সুইং সেকশনে ফিডিং / সাপ্লাই এন্ট্রি</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>সাপ্লাই টিমের নাম</label>
                        <select id="supTeam" class="form-control">
                            <option>আরমান টিম</option>
                            <option>মামুন টিম</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>কোন সুইং লাইনে?</label>
                        <input type="text" id="supLine" class="form-control" placeholder="যেমন: Line-01">
                    </div>
                </div>
                <div class="form-group">
                    <label>সাপ্লাই দেওয়া পরিমাণ (পিস)</label>
                    <input type="number" id="supPcs" class="form-control" placeholder="কত পিস দিলেন">
                </div>
                <button class="btn btn-success" onclick="addSupply()">সুইং ফিডিং কনফার্ম করুন</button>
            </div>
            <div class="card">
                <h3>সুইং ফিডিং হিস্ট্রি</h3>
                <table>
                    <thead><tr><th>টিম</th><th>লাইন</th><th>পরিমাণ</th></tr></thead>
                    <tbody id="listSupply"></tbody>
                </table>
            </div>
        </div>

        <!-- ৭. ওয়েস্টেজ & ঝুট -->
        <div id="tab-scrap" class="tab-content">
            <div class="card">
                <h3>কাটিং ছাঁটকাট (ঝুট) ও ওয়েস্টেজ ট্যালি</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>কাটিং ছাঁটকাট / ঝুট (কেজি)</label>
                        <input type="number" id="scJhuta" class="form-control" placeholder="কেজি">
                    </div>
                    <div class="form-group">
                        <label>এন্ড লস / জয়েন্ট লস (গজ)</label>
                        <input type="number" id="scLoss" class="form-control" placeholder="গজ">
                    </div>
                </div>
                <button class="btn btn-primary" onclick="addScrap()">ওয়েস্টেজ রেকর্ড করুন</button>
            </div>
            <div class="card">
                <h3>ওয়েস্টেজ তালিকা</h3>
                <table>
                    <thead><tr><th>ঝুট (কেজি)</th><th>লস (গজ)</th></tr></thead>
                    <tbody id="listScrap"></tbody>
                </table>
            </div>
        </div>

        <!-- ব্যাকআপ ও এক্সপোর্ট বাটন -->
        <div class="action-btns">
            <button class="btn btn-secondary" onclick="exportData()">ফাইল ব্যাকআপ ডাউনলোড (Export)</button>
            <button class="btn btn-secondary" onclick="clearData()" style="background:var(--danger)">রিসেট ডাটা</button>
        </div>
    </div>

    <script>
        let db = JSON.parse(localStorage.getItem('reliance_cutting_db')) || {
            fabric: [], marker: [], cutting: [], bundle: [], print: [], supply: [], scrap: []
        };

        function saveData() {
            localStorage.setItem('reliance_cutting_db', JSON.stringify(db));
            updateDash();
            renderTables();
        }

        function switchTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            event.target.classList.add('active');
            document.getElementById('tab-' + tabId).classList.add('active');
        }

        function calcMarker() {
            let p = document.getElementById('mPcs').value || 0;
            let l = document.getElementById('mLayers').value || 0;
            document.getElementById('markerResult').innerText = `অটো মোট বডি: ${p * l} পিস`;
        }

        function addFabric() {
            let s = document.getElementById('fabStyle').value, sh = document.getElementById('fabShade').value;
            let r = document.getElementById('fabRolls').value, q = parseFloat(document.getElementById('fabQty').value) || 0;
            let rx = document.getElementById('fabRelax').value;
            if(!q) return alert('পরিমাণ দিন');
            db.fabric.push({style:s, shade:sh, rolls:r, qty:q, relax:rx});
            saveData();
        }

        function addMarker() {
            let s = document.getElementById('mStyle').value;
            let p = parseInt(document.getElementById('mPcs').value)||0, l = parseInt(document.getElementById('mLayers').value)||0;
            if(!p || !l) return alert('মান দিন');
            db.marker.push({style:s, pcs:p, layers:l, total: p*l});
            saveData();
        }

        function addCutting() {
            let t = document.getElementById('cutTeam').value, p = parseInt(document.getElementById('cutPcs').value)||0;
            if(!p) return alert('পিস দিন');
            db.cutting.push({team:t, pcs:p, date: new Date().toLocaleDateString('bn-BD')});
            saveData();
        }

        function addBundle() {
            let b = document.getElementById('bNo').value, r = parseInt(document.getElementById('bRecut').value)||0;
            db.bundle.push({no:b, recut:r});
            saveData();
        }

        function addPrint() {
            let s = parseInt(document.getElementById('prSent').value)||0, r = parseInt(document.getElementById('prRec').value)||0;
            db.print.push({sent:s, rec:r, diff: s-r});
            saveData();
        }

        function addSupply() {
            let t = document.getElementById('supTeam').value, l = document.getElementById('supLine').value, p = parseInt(document.getElementById('supPcs').value)||0;
            if(!p) return alert('পিস দিন');
            db.supply.push({team:t, line:l, pcs:p});
            saveData();
        }

        function addScrap() {
            let j = parseFloat(document.getElementById('scJhuta').value)||0, l = parseFloat(document.getElementById('scLoss').value)||0;
            db.scrap.push({jhuta:j, loss:l});
            saveData();
        }

        function updateDash() {
            document.getElementById('dashFabric').innerText = db.fabric.reduce((a,b)=>a+b.qty,0);
            document.getElementById('dashCut').innerText = db.cutting.reduce((a,b)=>a+b.pcs,0);
            document.getElementById('dashRecut').innerText = db.bundle.reduce((a,b)=>a+b.recut,0);
            document.getElementById('dashSupply').innerText = db.supply.reduce((a,b)=>a+b.pcs,0);
        }

        function renderTables() {
            document.getElementById('listFabric').innerHTML = db.fabric.map(i=>`<tr><td>${i.style}</td><td>${i.shade}</td><td>${i.rolls}</td><td>${i.qty}</td><td>${i.relax}h</td></tr>`).join('');
            document.getElementById('listMarker').innerHTML = db.marker.map(i=>`<tr><td>${i.style}</td><td>${i.pcs}</td><td>${i.layers}</td><td><b>${i.total}</b></td></tr>`).join('');
            document.getElementById('listCutting').innerHTML = db.cutting.map(i=>`<tr><td>${i.team}</td><td>${i.pcs}</td><td>${i.date}</td></tr>`).join('');
            document.getElementById('listBundle').innerHTML = db.bundle.map(i=>`<tr><td>${i.no}</td><td>${i.recut}</td></tr>`).join('');
            document.getElementById('listPrint').innerHTML = db.print.map(i=>`<tr><td>${i.sent}</td><td>${i.rec}</td><td>${i.diff}</td></tr>`).join('');
            document.getElementById('listSupply').innerHTML = db.supply.map(i=>`<tr><td>${i.team}</td><td>${i.line}</td><td>${i.pcs}</td></tr>`).join('');
            document.getElementById('listScrap').innerHTML = db.scrap.map(i=>`<tr><td>${i.jhuta} kg</td><td>${i.loss} yd</td></tr>`).join('');
        }

        function exportData() {
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db));
            let dlAnchor = document.createElement('a');
            dlAnchor.setAttribute("href", dataStr);
            dlAnchor.setAttribute("download", "cutting_backup.json");
            dlAnchor.click();
        }

        function clearData() {
            if(confirm('আপনি কি সব ডাটা মুছে নতুন করে শুরু করতে চান?')) {
                localStorage.removeItem('reliance_cutting_db');
                db = {fabric:[], marker:[], cutting:[], bundle:[], print:[], supply:[], scrap:[]};
                saveData();
            }
        }

        updateDash();
        renderTables();
    </script>
</body>
</html>
