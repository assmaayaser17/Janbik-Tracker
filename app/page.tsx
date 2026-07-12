'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import {
  STATUSES,
  STATUS_HEX,
  OWNERS,
  DESIRES,
  DEFAULT_DATA,
  computeCounts,
  computePilotStats,
  type PilotRow,
} from '../lib/pilotData';

type Lang = 'ar' | 'en';

const T = {
  ar: {
    title: 'لوحة تتبّع التهيئة والإطلاق — جنبك',
    subtitle: 'أداة عمل فريق التهيئة والإطلاق · متابعة تقدّم البايلوت أمام مجلس الإدارة',
    window: 'نافذة البايلوت · ',
    windowDates: '1 يوليو ← 31 أكتوبر 2026',
    readMode: 'وضع القراءة',
    editMode: '🔓 وضع التحرير',
    editModeOn: '🔓 وضع التحرير (مفتوح)',
    loginBtn: 'دخول',
    cancel: 'إلغاء',
    logoutBtn: 'خروج',
    stamp: 'لوحة مباشرة — تُحدَّث فوريًا لكل من يشاهدها',
    k1: 'تقدّم البايلوت مقابل المستهدف والزمن',
    h_target: 'الوصول للمستهدف — شركاء مفعّلون',
    hint_target: 'المستهدف لهذه المرحلة: 3 إلى 5 حضانات مفعّلة (كل فرع يُحسب وحدة مستقلة)',
    ofTarget: 'من المستهدف 3–5',
    minLbl: 'الحد الأدنى (3)',
    maxLbl: 'الحد الأعلى (5)',
    h_time: 'التقدّم مقابل الزمن',
    hint_time: 'هل نحن سابقون للجدول أم متأخرون؟ مقارنة نسبة الإنجاز بنسبة الوقت المنقضي',
    achv: 'الإنجاز (نحو الحد الأدنى)',
    elapsed: 'الوقت المنقضي من البايلوت',
    k_kpi: 'المؤشرات الرقمية',
    k2: 'اللوحة البصرية التفاعلية',
    h_donut: 'توزيع الحالات في المسار',
    hint_donut: 'صحة الـpipeline في نظرة واحدة',
    h_geo: 'التركّز الجغرافي — أعلى الأحياء',
    hint_geo: 'أين تتركّز الفرص في القائمة',
    h_funnel: 'مسار التحويل الكامل',
    hint_funnel: 'من أول تواصل إلى التفعيل',
    k3: 'قائمة الحضانات',
    export: '⤓ تصدير Excel',
    import: '⤒ استيراد Excel',
    reset: '↺ استعادة النسخة الموحّدة',
    th_name: 'الحضانة والحي',
    th_phone: 'وسيلة التواصل',
    th_rating: 'التقييم',
    th_status: 'الحالة',
    th_owner: 'المسؤول',
    th_last: 'آخر تواصل',
    th_desire: 'الرغبة',
    th_notes: 'ملاحظات',
    f1b: 'ملاحظة مصدر البيانات:',
    f1: 'جزء من القائمة جُمع من بحث ميداني أولي (خرائط) كنقطة انطلاق، والباقي يُضاف ويُوثّق من الفريق. المصادر الرسمية للترخيص: منصة قُرّة وبوابة وزارة الموارد البشرية.',
    f2: 'هذه اللوحة أونلاين ومتصلة بقاعدة بيانات مباشرة · أي تعديل يظهر فورًا لكل من يفتح اللينك · وضع القراءة متاح للجميع بدون تسجيل دخول، والتعديل يتطلب حساب فريق.',
    allStatuses: 'كل الحالات',
    allOwners: 'كل المسؤولين',
    allDesires: 'كل مستويات الرغبة',
    noneDesire: 'لم يُحدَّد',
    addRow: '＋ إضافة حضانة جديدة',
    facilities: 'حضانة',
    ahead: '✔ سابقون للجدول — نسبة الإنجاز أعلى من نسبة الوقت المنقضي',
    behind: '⚠ تنبيه — نسبة الوقت المنقضي أعلى من نسبة الإنجاز',
    kpiActive: 'بايلوت مفعّل',
    kpiTraining: 'تدريب وتهيئة',
    kpiMeeting: 'اجتماع محدّد',
    kpiInterested: 'مهتم',
    kpiContacted: 'تم التواصل',
    kpiTotal: 'إجمالي القائمة',
    kpiRejected: 'مرفوض',
    onTarget: 'ضمن المستهدف',
    toMinimum: (n: number) => `متبقٍ ${n} للحد الأدنى`,
    deleteConfirm: (name: string) => `حذف "${name}"؟`,
    importConfirm: (n: number) => `سيتم استبدال قائمة الجميع (اللوحة المباشرة) بـ ${n} حضانة من الملف. هذا يؤثر على كل من يشاهد اللوحة الآن. متابعة؟`,
    resetConfirm: 'استعادة النسخة الموحّدة (9 يوليو 2026) لكل المشاهدين؟ سيتم استبدال كل التعديلات الحالية.',
    noValidRows: 'الملف لا يحتوي بيانات صالحة',
    cantReadFile: 'تعذّرت قراءة الملف',
    invalidLogin: 'بيانات الدخول غير صحيحة',
    loadError: 'تعذر تحميل البيانات: ',
    saveError: 'تعذر الحفظ: ',
    deleteError: 'تعذر الحذف: ',
    addError: 'تعذرت الإضافة: ',
    restoreError: 'تعذرت الاستعادة: ',
    replaceError: 'تعذر الاستبدال: ',
    uploadError: 'تعذر رفع البيانات: ',
    saved: 'تم الحفظ',
    loading: 'جارٍ التحميل...',
    emailPh: 'إيميل الفريق',
    passPh: 'كلمة المرور',
  },
  en: {
    title: 'Onboarding & Launch Tracker — JANBIK',
    subtitle: 'Onboarding & Launch team workspace · Pilot progress for the board',
    window: 'Pilot window · ',
    windowDates: '1 July → 31 October 2026',
    readMode: 'Read mode',
    editMode: '🔓 Edit mode',
    editModeOn: '🔓 Edit mode (on)',
    loginBtn: 'Sign in',
    cancel: 'Cancel',
    logoutBtn: 'Log out',
    stamp: 'Live board — updates instantly for everyone',
    k1: 'Pilot progress vs. target & time',
    h_target: 'Target reach — activated partners',
    hint_target: 'Phase target: 3 to 5 activated daycares (each branch counts as one unit)',
    ofTarget: 'of target 3–5',
    minLbl: 'Min (3)',
    maxLbl: 'Max (5)',
    h_time: 'Progress vs. time',
    hint_time: 'Ahead or behind schedule? Achievement % vs. elapsed time %',
    achv: 'Achievement (toward minimum)',
    elapsed: 'Elapsed pilot time',
    k_kpi: 'Key numbers',
    k2: 'Interactive dashboard',
    h_donut: 'Pipeline status distribution',
    hint_donut: 'Pipeline health at a glance',
    h_geo: 'Geographic concentration — top districts',
    hint_geo: 'Where the opportunities cluster',
    h_funnel: 'Full conversion funnel',
    hint_funnel: 'From first contact to activation',
    k3: 'Daycare list',
    export: '⤓ Export Excel',
    import: '⤒ Import Excel',
    reset: '↺ Restore unified version',
    th_name: 'Daycare & district',
    th_phone: 'Contact',
    th_rating: 'Rating',
    th_status: 'Status',
    th_owner: 'Owner',
    th_last: 'Last contact',
    th_desire: 'Interest',
    th_notes: 'Notes',
    f1b: 'Data source note:',
    f1: 'Part of the list came from initial field research (maps) as a starting point; the rest is added and verified by the team. Official licensing sources: Qurrah platform and the HRSD portal.',
    f2: 'This board is online and connected to a live database · any edit appears instantly for everyone with the link · read mode needs no login, editing requires a team account.',
    allStatuses: 'All statuses',
    allOwners: 'All owners',
    allDesires: 'All interest levels',
    noneDesire: 'Not set',
    addRow: '＋ Add new daycare',
    facilities: 'facilities',
    ahead: '✔ Ahead of schedule — achievement exceeds elapsed time',
    behind: '⚠ Attention — elapsed time exceeds achievement',
    kpiActive: 'Activated pilots',
    kpiTraining: 'In training & prep',
    kpiMeeting: 'Meeting set',
    kpiInterested: 'Interested',
    kpiContacted: 'Contacted',
    kpiTotal: 'Total list',
    kpiRejected: 'Declined',
    onTarget: 'On target',
    toMinimum: (n: number) => `${n} to minimum`,
    deleteConfirm: (name: string) => `Delete "${name}"?`,
    importConfirm: (n: number) => `This will replace the LIVE shared list for everyone with ${n} rows from the file. Continue?`,
    resetConfirm: 'Restore the unified version (9 July 2026) for everyone? Current live edits will be replaced.',
    noValidRows: 'No valid rows found',
    cantReadFile: 'Could not read the file',
    invalidLogin: 'Invalid email or password',
    loadError: 'Could not load data: ',
    saveError: 'Could not save: ',
    deleteError: 'Could not delete: ',
    addError: 'Could not add: ',
    restoreError: 'Could not restore: ',
    replaceError: 'Could not replace: ',
    uploadError: 'Could not upload rows: ',
    saved: 'Saved',
    loading: 'Loading...',
    emailPh: 'Team email',
    passPh: 'Password',
  },
} as const;

type TranslationKey = keyof typeof T.ar;

const XL_HEADERS = ['الحضانة', 'الحي', 'وسيلة التواصل', 'التقييم', 'عدد المراجعات', 'الحالة', 'المسؤول', 'آخر تواصل', 'الرغبة', 'ملاحظات'];

export default function Page() {
  const [rows, setRows] = useState<PilotRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [lang, setLang] = useState<Lang>('ar');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPass, setLoginPass] = useState<string>('');
  const [loginErr, setLoginErr] = useState<string>('');
  const [fStatus, setFStatus] = useState<string>('');
  const [fOwner, setFOwner] = useState<string>('');
  const [fDesire, setFDesire] = useState<string>('');
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reloadTimer = useRef<number | null>(null);

  const translations = useMemo(() => T[lang] ?? T.ar, [lang]);
  const t = useCallback(<K extends TranslationKey>(k: K) => translations[k], [translations]);

  const showToast = useCallback((msg?: string) => {
    setToast({ show: true, msg: msg || (t('saved') as string) });
    setTimeout(() => setToast((s) => ({ ...s, show: false })), 1400);
  }, [t]);

  const loadRows = useCallback(async () => {
    const { data, error } = await supabase
      .from('pilot_rows')
      .select('id,name,district,phone,rating,reviews,status,owner,last,desire,notes,position')
      .order('position', { ascending: true });
    if (error) {
      console.error(error);
      alert((t('loadError') as string) + error.message);
      setLoading(false);
      return;
    }
    setRows((data as PilotRow[]) || []);
    setLoading(false);
  }, [t]);

  const scheduleReload = useCallback(() => {
    if (reloadTimer.current) window.clearTimeout(reloadTimer.current);
    reloadTimer.current = window.setTimeout(loadRows, 400);
  }, [loadRows]);

  // initial load + realtime subscription
  useEffect(() => {
    loadRows();
    const channel = supabase
      .channel('pilot_rows_live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pilot_rows' }, scheduleReload)
      .subscribe();
    return () => {
      if (reloadTimer.current) window.clearTimeout(reloadTimer.current);
      supabase.removeChannel(channel);
    };
  }, [loadRows, scheduleReload]);

  // auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setCurrentUser(data.session ? data.session.user : null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session ? session.user : null);
      if (!session) setEditing(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const patchRow = useCallback(async (id: string, field: keyof PilotRow, value: string) => {
    const patch: Partial<PilotRow> = { [field]: value } as Partial<PilotRow>;
    const { error } = await supabase.from('pilot_rows').update(patch).eq('id', id);
    if (error) {
      alert((t('saveError') as string) + error.message);
      return false;
    }
    showToast();
    return true;
  }, [t, showToast]);

  const handleCellCommit = useCallback((id: string, field: keyof PilotRow, value: string) => {
    setRows((prev) => {
      const row = prev.find((r) => r.id === id);
      if (!row || (row[field] as string) === value) return prev;
      patchRow(id, field, value);
      return prev.map((r) => (r.id === id ? { ...r, [field]: value } : r));
    });
  }, [patchRow]);

  const handleSelectChange = useCallback(async (id: string, field: keyof PilotRow, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    await patchRow(id, field, value);
  }, [patchRow]);

  const handleDelete = useCallback(async (id: string, name: string) => {
    if (!confirm((t('deleteConfirm') as (n: string) => string)(name))) return;
    const { error } = await supabase.from('pilot_rows').delete().eq('id', id);
    if (error) {
      alert((t('deleteError') as string) + error.message);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, [t]);

  async function handleAddRow() {
    const minPos = rows.length ? Math.min(...rows.map((r) => r.position ?? 0)) : 0;
    const newRow: PilotRow = {
      name: lang === 'ar' ? 'حضانة جديدة' : 'New daycare',
      district: '',
      phone: '',
      rating: 0,
      reviews: 0,
      status: 'لم يتم التواصل',
      owner: '—',
      last: '',
      desire: '',
      notes: '',
      position: minPos - 1,
    };
    const { data, error } = await supabase.from('pilot_rows').insert(newRow).select().single();
    if (error) {
      alert((t('addError') as string) + error.message);
      return;
    }
    setRows((prev) => [data as PilotRow, ...prev]);
  }

  function handleExportExcel() {
    import('xlsx').then((XLSX) => {
      const aoa: (string | number)[][] = [XL_HEADERS as (string | number)[]].concat(
        rows.map((r) => [r.name, r.district, r.phone, r.rating, r.reviews, r.status, r.owner, r.last, r.desire, r.notes])
      );
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      ws['!cols'] = [{ wch: 34 }, { wch: 16 }, { wch: 18 }, { wch: 8 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 11 }, { wch: 60 }];
      if (!ws['!views']) ws['!views'] = [{ RTL: true }];
      const wb = XLSX.utils.book_new();
      wb.Workbook = { Views: [{ RTL: true }] };
      XLSX.utils.book_append_sheet(wb, ws, 'قائمة الحضانات');
      const d = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(wb, `janbik_onboarding_${d}.xlsx`);
    });
  }

  function handleImportExcel(file: File) {
    import('xlsx').then((XLSX) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const wb = XLSX.read(e.target?.result, { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const arr = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' });
          const mapped: PilotRow[] = arr
            .map((o) => ({
              name: String(o['الحضانة'] || '').trim(),
              district: String(o['الحي'] || '').trim(),
              phone: String(o['وسيلة التواصل'] || '').trim(),
              rating: parseFloat(String(o['التقييم'])) || 0,
              reviews: parseInt(String(o['عدد المراجعات'])) || 0,
              status: String(o['الحالة'] || 'لم يتم التواصل').trim(),
              owner: String(o['المسؤول'] || '—').trim(),
              last: String(o['آخر تواصل'] || '').slice(0, 10),
              desire: String(o['الرغبة'] || '').trim(),
              notes: String(o['ملاحظات'] || '').trim(),
            }))
            .filter((r) => r.name);
          if (!mapped.length) {
            alert(t('noValidRows'));
            return;
          }
          if (!confirm((t('importConfirm') as (n: number) => string)(mapped.length))) return;
          const withPos = mapped.map((r, i) => ({ ...r, position: i }));
          const { error: delErr } = await supabase.from('pilot_rows').delete().not('id', 'is', null);
          if (delErr) {
            alert((t('replaceError') as string) + delErr.message);
            return;
          }
          const { error: insErr } = await supabase.from('pilot_rows').insert(withPos);
          if (insErr) {
            alert((t('uploadError') as string) + insErr.message);
            return;
          }
          await loadRows();
        } catch (err) {
          alert(t('cantReadFile'));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async function handleReset() {
    if (!confirm(t('resetConfirm'))) return;
    const withPos = DEFAULT_DATA.map((r, i) => ({ ...r, position: i }));
    const { error: delErr } = await supabase.from('pilot_rows').delete().not('id', 'is', null);
    if (delErr) {
      alert((t('restoreError') as string) + delErr.message);
      return;
    }
    const { error: insErr } = await supabase.from('pilot_rows').insert(withPos);
    if (insErr) {
      alert((t('restoreError') as string) + insErr.message);
      return;
    }
    await loadRows();
  }

  async function handleLogin() {
    setLoginErr('');
    if (!loginEmail.trim() || !loginPass) return;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPass,
    });
    if (error) {
      setLoginErr(t('invalidLogin'));
      return;
    }
    setCurrentUser(data.user);
    setLoginOpen(false);
    setLoginEmail('');
    setLoginPass('');
    setEditing(true);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setEditing(false);
  }

  function toggleEdit() {
    if (editing) return;
    if (currentUser) {
      setEditing(true);
      return;
    }
    setLoginOpen(true);
  }

  const counts = useMemo(() => computeCounts(rows), [rows]);
  const stats = useMemo(() => computePilotStats(rows), [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (fStatus && r.status !== fStatus) return false;
      if (fOwner && r.owner !== fOwner) return false;
      if (fDesire === '__none' && r.desire) return false;
      if (fDesire && fDesire !== '__none' && r.desire !== fDesire) return false;
      return true;
    });
  }, [rows, fStatus, fOwner, fDesire]);

  const donut = useMemo(() => {
    const total = rows.length || 1;
    let acc = 0;
    const R = 60,
      CX = 90,
      CY = 90;
    const segs: { s: string; d: string; color: string; n: number }[] = [];
    STATUSES.forEach((s) => {
      const n = counts[s];
      if (!n) return;
      const a0 = (acc / total) * 2 * Math.PI - Math.PI / 2;
      acc += n;
      const a1 = (acc / total) * 2 * Math.PI - Math.PI / 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const x0 = CX + R * Math.cos(a0),
        y0 = CY + R * Math.sin(a0);
      const x1 = CX + R * Math.cos(a1),
        y1 = CY + R * Math.sin(a1);
      segs.push({ s, d: `M ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1}`, color: STATUS_HEX[s], n });
    });
    return segs;
  }, [rows, counts]);

  const geo = useMemo(() => {
    const g: Record<string, number> = {};
    rows.forEach((r) => {
      const d = r.district || '—';
      g[d] = (g[d] || 0) + 1;
    });
    const top = Object.entries(g).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const max = top.length ? top[0][1] : 1;
    return { top, max };
  }, [rows]);

  const funnel = useMemo(() => {
    const contacted = rows.length - (counts['لم يتم التواصل'] || 0);
    const interested = (counts['مهتم'] || 0) + (counts['اجتماع محدّد'] || 0) + (counts['تدريب وتهيئة'] || 0) + (counts['بايلوت مفعّل'] || 0);
    const meeting = (counts['اجتماع محدّد'] || 0) + (counts['تدريب وتهيئة'] || 0) + (counts['بايلوت مفعّل'] || 0);
    const training = (counts['تدريب وتهيئة'] || 0) + (counts['بايلوت مفعّل'] || 0);
    const active = counts['بايلوت مفعّل'] || 0;
    const stages: [string, number][] =
      lang === 'ar'
        ? [
            ['إجمالي القائمة', rows.length],
            ['تم التواصل معهم', contacted],
            ['مهتم فأعلى', interested],
            ['اجتماع فأعلى', meeting],
            ['تدريب فأعلى', training],
            ['بايلوت مفعّل', active],
          ]
        : [
            ['Total list', rows.length],
            ['Contacted', contacted],
            ['Interested+', interested],
            ['Meeting+', meeting],
            ['Training+', training],
            ['Activated', active],
          ];
    const max = rows.length || 1;
    const cols = ['#0C3B3B', '#00736B', '#009999', '#7242BA', '#AF92FF', '#DFFF4F'];
    return stages.map(([l, n], i) => ({ l, n, width: Math.max((n / max) * 100, 28), bg: cols[i], color: i === 5 ? '#0C3B3B' : '#fff' }));
  }, [rows, counts, lang]);

  const verdictAhead = stats.achvPct >= stats.timePct;

  if (loading) {
    return <div className="loading-screen">{t('loading')}</div>;
  }

  return (
    <>
      {!isSupabaseConfigured && (
        <div className="config-warning">
          ⚠ لم يتم ضبط بيانات Supabase بعد (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) — راجع ملف .env.local.example
        </div>
      )}
      <header>
        <div className="circle"></div>
        <div className="circle2"></div>
        <div className="brand">
          <div className="logo">جنبك</div>
          <div>
            <h1>{t('title')}</h1>
            <div className="sub">{t('subtitle')}</div>
          </div>
        </div>
        <div className="headbar">
          <span className="window">
            {t('window')}
            <b>{t('windowDates')}</b>
          </span>
          <button className={`pill read ${!editing ? 'active' : ''}`} onClick={() => setEditing(false)}>
            {t('readMode')}
          </button>
          <button className={`pill edit ${editing ? 'active' : ''}`} onClick={toggleEdit}>
            {editing ? t('editModeOn') : t('editMode')}
          </button>
          {currentUser && (
            <span className="pill user">
              <span>{currentUser.email}</span>
              <button onClick={handleLogout}>{t('logoutBtn')}</button>
            </span>
          )}
          <button className="pill lang" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
        </div>
        {loginOpen && !currentUser && (
          <div id="loginRow">
            <input
              type="email"
              placeholder={t('emailPh')}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              autoComplete="username"
            />
            <input
              type="password"
              placeholder={t('passPh')}
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              autoComplete="current-password"
            />
            <button onClick={handleLogin}>{t('loginBtn')}</button>
            <button
              className="cancel"
              onClick={() => {
                setLoginOpen(false);
                setLoginErr('');
              }}
            >
              {t('cancel')}
            </button>
            {loginErr && <div className="err">{loginErr}</div>}
          </div>
        )}
        <div className="datastamp">
          <span className="livedot"></span>
          <span>{t('stamp')}</span>
        </div>
      </header>

      <div className="wrap">
        <section>
          <div className="kicker">{t('k1')}</div>
          <div className="grid2">
            <div>
              <h3>{t('h_target')}</h3>
              <div className="hint">{t('hint_target')}</div>
              <div className="meterWrap">
                <span className="bigNum">{stats.active}</span>
                <small className="bigNum">
                  <small>{t('ofTarget')}</small>
                </small>
                <span className={`badge ${stats.active >= 3 ? 'ok' : 'warn'}`}>
                  {stats.active >= 3 ? t('onTarget') : (t('toMinimum') as (n: number) => string)(3 - stats.active)}
                </span>
                <div className="meter">
                  <div className="fill" style={{ width: `${Math.min((stats.active / 5) * 100, 100)}%` }}></div>
                  <div className="tick" style={{ right: '60%' }}></div>
                  <div className="ticklbl" style={{ right: '60%' }}>{t('minLbl')}</div>
                  <div className="tick" style={{ right: '100%' }}></div>
                  <div className="ticklbl" style={{ right: '99%' }}>{t('maxLbl')}</div>
                </div>
              </div>
            </div>
            <div>
              <h3>{t('h_time')}</h3>
              <div className="hint">{t('hint_time')}</div>
              <div className="cmp">
                <div className="row">
                  <div className="lbl">
                    <span>{t('achv')}</span>
                    <b>{stats.achvPct}%</b>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${stats.achvPct}%`, background: 'var(--teal)' }}></i>
                  </div>
                </div>
                <div className="row">
                  <div className="lbl">
                    <span>{t('elapsed')}</span>
                    <b>{stats.timePct}%</b>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${stats.timePct}%`, background: 'var(--lavender)' }}></i>
                  </div>
                </div>
                <div className={`verdict ${verdictAhead ? 'ahead' : 'behind'}`}>{verdictAhead ? t('ahead') : t('behind')}</div>
              </div>
            </div>
          </div>

          <div className="kicker" style={{ marginTop: 18 }}>{t('k_kpi')}</div>
          <div className="kpis">
            {(
              [
                ['kpiActive', counts['بايلوت مفعّل'] || 0, true],
                ['kpiTraining', counts['تدريب وتهيئة'] || 0, false],
                ['kpiMeeting', counts['اجتماع محدّد'] || 0, false],
                ['kpiInterested', counts['مهتم'] || 0, false],
                ['kpiContacted', counts['تم التواصل'] || 0, false],
                ['kpiRejected', counts['مرفوض'] || 0, false],
                ['kpiTotal', rows.length, false],
              ] as [TranslationKey, number, boolean][]
            ).map(([key, n, hl]) => (
              <div key={key} className={`kpi ${hl ? 'hl' : ''}`}>
                <div className="n">{n}</div>
                <div className="t">{t(key) as string}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="kicker">{t('k2')}</div>
          <div className="charts">
            <div className="chartbox">
              <h3>{t('h_donut')}</h3>
              <div className="hint">{t('hint_donut')}</div>
              <svg viewBox="0 0 180 180" width="180" height="180" style={{ display: 'block', margin: '0 auto' }}>
                {donut.map((seg, i) => (
                  <path key={i} d={seg.d} fill="none" stroke={seg.color} strokeWidth="26" />
                ))}
                <text x="90" y="86" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#372358" fontFamily="Tahoma">
                  {rows.length}
                </text>
                <text x="90" y="104" textAnchor="middle" fontSize="10" fill="#8A9AA0" fontFamily="Tahoma">
                  {t('facilities')}
                </text>
              </svg>
              <div className="legend">
                {donut.map((seg, i) => (
                  <div key={i}>
                    <span className="dot" style={{ background: seg.color }}></span>
                    {seg.s} · <b>{seg.n}</b>
                  </div>
                ))}
              </div>
            </div>
            <div className="chartbox">
              <h3>{t('h_geo')}</h3>
              <div className="hint">{t('hint_geo')}</div>
              {geo.top.map(([d, n]) => (
                <div className="hbar" key={d}>
                  <div className="lbl">
                    <span>{d}</span>
                    <b>{n}</b>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${(n / geo.max) * 100}%` }}></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="chartbox">
              <h3>{t('h_funnel')}</h3>
              <div className="hint">{t('hint_funnel')}</div>
              <div className="funnel">
                {funnel.map((f, i) => (
                  <div className="stage" key={i} style={{ width: `${f.width}%`, background: f.bg, color: f.color }}>
                    <span>{f.l}</span>
                    <b>{f.n}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="kicker">{t('k3')}</div>
          <div className="toolbar">
            <select value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
              <option value="">{t('allStatuses')}</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select value={fOwner} onChange={(e) => setFOwner(e.target.value)}>
              <option value="">{t('allOwners')}</option>
              {OWNERS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <select value={fDesire} onChange={(e) => setFDesire(e.target.value)}>
              <option value="">{t('allDesires')}</option>
              <option value="لديه رغبة">لديه رغبة</option>
              <option value="لا رغبة">لا رغبة</option>
              <option value="__none">{t('noneDesire')}</option>
            </select>
            <button className="btn primary" onClick={handleExportExcel}>{t('export')}</button>
            {editing && (
              <>
                <button className="btn ghost" onClick={() => fileInputRef.current?.click()}>{t('import')}</button>
                <button className="btn ghost" onClick={handleReset}>{t('reset')}</button>
              </>
            )}
            <input
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files?.[0]) handleImportExcel(e.target.files[0]);
                e.target.value = '';
              }}
            />
            <span className="count">{filteredRows.length} / {rows.length}</span>
          </div>
          <div className="tblwrap">
            <table>
              <thead>
                <tr>
                  <th>{t('th_name')}</th>
                  <th>{t('th_phone')}</th>
                  <th>{t('th_rating')}</th>
                  <th>{t('th_status')}</th>
                  <th>{t('th_owner')}</th>
                  <th>{t('th_last')}</th>
                  <th>{t('th_desire')}</th>
                  <th>{t('th_notes')}</th>
                  {editing && <th></th>}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r) => (
                  <Row
                    key={r.id}
                    row={r}
                    editing={editing}
                    onCommit={handleCellCommit}
                    onSelectChange={handleSelectChange}
                    onDelete={handleDelete}
                  />
                ))}
                {editing && (
                  <tr className="addrow">
                    <td colSpan={9} onClick={handleAddRow}>{t('addRow')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          <div>
            <b>{t('f1b')}</b> <span>{t('f1')}</span>
          </div>
          <div>{t('f2')}</div>
        </footer>
      </div>

      <div id="toast" className={toast.show ? 'show' : ''}>{toast.msg || t('saved')}</div>
    </>
  );
}

function Stars({ r }: { r: PilotRow }) {
  if (!r.rating) return <span className="stars">—</span>;
  return (
    <span className="stars">
      ★ {r.rating}
      {r.reviews ? <span style={{ color: '#8A9AA0' }}> ({r.reviews})</span> : null}
    </span>
  );
}

interface RowProps {
  row: PilotRow;
  editing: boolean;
  onCommit: (id: string, field: keyof PilotRow, value: string) => void;
  onSelectChange: (id: string, field: keyof PilotRow, value: string) => void;
  onDelete: (id: string, name: string) => void;
}

function Row({ row: r, editing, onCommit, onSelectChange, onDelete }: RowProps) {
  const id = r.id as string;

  if (editing) {
    return (
      <tr>
        <td className="name">
          <span contentEditable suppressContentEditableWarning onBlur={(e) => onCommit(id, 'name', e.currentTarget.textContent?.trim() || '')}>
            {r.name}
          </span>
          <span className="dist" contentEditable suppressContentEditableWarning onBlur={(e) => onCommit(id, 'district', e.currentTarget.textContent?.trim() || '')}>
            {r.district}
          </span>
        </td>
        <td className="phone" contentEditable suppressContentEditableWarning onBlur={(e) => onCommit(id, 'phone', e.currentTarget.textContent?.trim() || '')}>
          {r.phone}
        </td>
        <td><Stars r={r} /></td>
        <td>
          <select value={r.status} onChange={(e) => onSelectChange(id, 'status', e.target.value)} style={{ maxWidth: 130 }}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </td>
        <td>
          <select value={r.owner} onChange={(e) => onSelectChange(id, 'owner', e.target.value)} style={{ maxWidth: 130 }}>
            {OWNERS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </td>
        <td contentEditable suppressContentEditableWarning onBlur={(e) => onCommit(id, 'last', e.currentTarget.textContent?.trim() || '')}>
          {r.last}
        </td>
        <td>
          <select value={r.desire} onChange={(e) => onSelectChange(id, 'desire', e.target.value)} style={{ maxWidth: 130 }}>
            {DESIRES.map((d) => (
              <option key={d || '__empty'} value={d}>{d || '—'}</option>
            ))}
          </select>
        </td>
        <td className="notes" contentEditable suppressContentEditableWarning onBlur={(e) => onCommit(id, 'notes', e.currentTarget.textContent?.trim() || '')}>
          {r.notes}
        </td>
        <td className="editonly" style={{ display: 'table-cell' }}>
          <button className="delbtn" title="حذف" onClick={() => onDelete(id, r.name)}>🗑</button>
        </td>
      </tr>
    );
  }

  const chip = (
    <span className="chip" style={{ background: `${STATUS_HEX[r.status]}22`, color: STATUS_HEX[r.status], border: `1px solid ${STATUS_HEX[r.status]}55` }}>
      {r.status}
    </span>
  );
  const desire = r.desire ? (
    <span className="desire" style={{ color: r.desire === 'لديه رغبة' ? 'var(--green)' : 'var(--red)' }}>
      {r.desire === 'لديه رغبة' ? '✔ ' : '✖ '}{r.desire}
    </span>
  ) : (
    <span className="desire" style={{ color: 'var(--gray)' }}>—</span>
  );

  return (
    <tr>
      <td className="name">
        {r.name}
        <span className="dist">{r.district}</span>
      </td>
      <td className="phone">{r.phone || '—'}</td>
      <td><Stars r={r} /></td>
      <td>{chip}</td>
      <td>{r.owner}</td>
      <td>{r.last || '—'}</td>
      <td>{desire}</td>
      <td className="notes">{r.notes || '—'}</td>
    </tr>
  );
}
