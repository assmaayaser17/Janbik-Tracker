export interface PilotRow {
  id?: string;
  name: string;
  district: string;
  phone: string;
  rating: number;
  reviews: number;
  status: string;
  owner: string;
  last: string;
  desire: string;
  notes: string;
  position?: number;
  updated_at?: string;
}

export type StatusCounts = Record<string, number>;

export interface PilotStats {
  active: number;
  timePct: number;
  achvPct: number;
  counts: StatusCounts;
}

export const STATUSES: string[] = [
  'بايلوت مفعّل',
  'تدريب وتهيئة',
  'اجتماع محدّد',
  'مهتم',
  'تم التواصل',
  'لم يتم التواصل',
  'مرفوض',
];

export const STATUS_HEX: Record<string, string> = {
  'بايلوت مفعّل': '#009999',
  'تدريب وتهيئة': '#7242BA',
  'اجتماع محدّد': '#AF92FF',
  'مهتم': '#0F6E56',
  'تم التواصل': '#9C7A3C',
  'لم يتم التواصل': '#8A9AA0',
  'مرفوض': '#B3543F',
};

export const OWNERS: string[] = ['طيف', 'جودي', 'طيف وجودي', '—'];
export const DESIRES: string[] = ['لديه رغبة', 'لا رغبة', ''];

export const PILOT_START = new Date('2026-07-01');
export const PILOT_END = new Date('2026-10-31');

// Only used by the "restore unified version" button — live data always
// comes from Supabase. This is the 9 July 2026 unified snapshot.
export const DEFAULT_DATA: PilotRow[] = [{"name":"Kid's Day — فرع أم الحمام","district":"أم الحمام","phone":"","rating":5.0,"reviews":0,"status":"بايلوت مفعّل","owner":"جودي","last":"2026-06-14","desire":"لديه رغبة","notes":"أنهت التدريب · بدأ التفعيل الفعلي"},{"name":"Kid's Day — فرع المدينة الرقمية","district":"المدينة الرقمية","phone":"","rating":0,"reviews":0,"status":"بايلوت مفعّل","owner":"طيف","last":"2026-06-14","desire":"لديه رغبة","notes":"أنهت التدريب · بدأ التفعيل الفعلي"},{"name":"Wishes Tree (وشيز تري)","district":"حطين","phone":"+966 54 993 4538","rating":0,"reviews":0,"status":"تدريب وتهيئة","owner":"جودي","last":"2026-07-06","desire":"لديه رغبة","notes":"زيارة أولى وبدء التدريب - الأحد ٦ يوليو · التفعيل الفعلي بعد أسبوعين تقريباً"},{"name":"مركز بيت أمي - ضيافة أطفال","district":"النرجس","phone":"+966 58 382 5116","rating":4.2,"reviews":293,"status":"تدريب وتهيئة","owner":"طيف وجودي","last":"","desire":"لديه رغبة","notes":"وافق على الانضمام · لم يبدأ التدريب بعد"},{"name":"Lillia Garden","district":"حطين","phone":"+966 55 388 8061","rating":5.0,"reviews":0,"status":"اجتماع محدّد","owner":"جودي","last":"2026-07-09","desire":"لديه رغبة","notes":"تم تحديد اجتماع حضوري لاستعراض المنصة"},{"name":"حضانة اشبال الغد","district":"Mulham Al izdihar","phone":"+966 50 908 4095","rating":3.0,"reviews":0,"status":"اجتماع محدّد","owner":"جودي","last":"2026-06-30","desire":"لديه رغبة","notes":"تم التواصل، وأبدت اهتمامًا بالمنصة، ووافقت على الزيارة، وما زلنا بانتظار تحديد موعد الزيارة"},{"name":"حضانة نمائي","district":"الملقا","phone":"+966 50 193 5188","rating":5.0,"reviews":0,"status":"اجتماع محدّد","owner":"جودي","last":"2026-07-09","desire":"لديه رغبة","notes":"تم تحديد اجتماع حضوري لاستعراض المنصة"},{"name":"حضانة عوامل النجاح","district":"قرطبة","phone":"+966 55 201 0393","rating":4.0,"reviews":0,"status":"مهتم","owner":"جودي","last":"2026-07-01","desire":"لديه رغبة","notes":"تمت زيارة الحضانة حضوريًا، وأبدت المديرة اهتمامًا كبيرًا بالمنصة، وطلبت إرسال الملف التعريفي لمشاركته مع الإدارة. تم إرسال الملف ومتابعة التواصل معها، إلا أنه لم يتم تلقي رد حتى الآن"},{"name":"مركز أمنيتي الصغيرة لضيافة الأطفال","district":"النرجس","phone":"+966 55 422 2927","rating":3.9,"reviews":108,"status":"مهتم","owner":"—","last":"","desire":"","notes":"ظهرت بحالة (مهتم) في ملف جودي دون مسؤول محدّد - بحاجة لإسناد وتوثيق"},{"name":"Clouds Daycare","district":"النرجس","phone":"+966 55 886 2251","rating":4.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-06-30","desire":"لديه رغبة","notes":"تم التواصل، وتمت الموافقة على استلام الملف التعريفي، إلا أنه لم يتم تلقي أي رد حتى الآن"},{"name":"Kids Home","district":"كافد","phone":"+966 53 604 2024","rating":5.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-07-08","desire":"لديه رغبة","notes":"تم التواصل، وأبدوا اهتمامًا مبدئيًا، وتم تزويدي برقم المديرة وإرسال الملف التعريفي لها، إلا أنه لم يتم تلقي أي رد حتى الآن."},{"name":"Little Angle","district":"Marvela Community","phone":"+966 59 222 9292","rating":5.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-06-30","desire":"لديه رغبة","notes":"تم التواصل، وتمت الموافقة على استلام الملف التعريفي، إلا أنه لم يتم تلقي أي رد حتى الآن"},{"name":"Little Lane","district":"النرجس","phone":"+966 55 939 2937","rating":5.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-07-07","desire":"لديه رغبة","notes":"تم التواصل، وأبدت الموظفة اهتمامًا مبدئيًا، وأفادت بأن المديرة مسافرة حاليًا، وطلبت إرسال التفاصيل عبر الواتساب، على أن تُبلغ المديرة بها عند عودتها للتواصل معنا"},{"name":"RZN Junior","district":"الروابي","phone":"+966 55 852 9911","rating":5.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-06-25","desire":"لديه رغبة","notes":"تم التواصل، وتم الحصول على موافقة مبدئية، وتزويدنا بالبريد الإلكتروني لإرسال الملف التعريفي. تم إرسال الملف ومتابعة التواصل عدة مرات، إلا أنه لم يتم تلقي أي رد حتى الآن"},{"name":"Smart Kids Montessori (سمارت كيدز منتسوري)","district":"العارض","phone":"+966 50 651 1177","rating":5.0,"reviews":4,"status":"تم التواصل","owner":"طيف","last":"2026-07-01","desire":"لديه رغبة","notes":"تواصلت جودي (٣٠ يونيو) وطيف (١ يوليو) مع نفس الحضانة - تم توحيد السجل وإسناده لطيف. تم تزويدنا برقم مسؤول التسويق (في إجازة حتى 17 أغسطس) وإرسال الملف التعريفي، ولم يُتلقَّ رد حتى الآن"},{"name":"تطلعات الياسمين لضيافة الاطفال","district":"المحمودية","phone":"+966 53 052 3728","rating":4.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-06-30","desire":"لديه رغبة","notes":"تم التواصل، وتمت الموافقة على استلام الملف التعريفي، إلا أنه لم يتم تلقي أي رد حتى الآن"},{"name":"حضانة الدوح","district":"Al Nuzhah","phone":"+966 53 847 1091","rating":4.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-06-30","desire":"لديه رغبة","notes":"تم التواصل، وتمت الموافقة على استلام الملف التعريفي، إلا أنه لم يتم تلقي أي رد حتى الآن"},{"name":"حضانة المنار","district":"النرجس","phone":"+966 55 955 3068","rating":3.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-07-01","desire":"لا رغبة","notes":"تمت زيارة الفرع، وتم عرض المنصة على المديرة، حيث أبدت إعجابًا كبيرًا بها، وطلبت إرسال الملف التعريفي لمشاركته مع المدير. إلا أن مستوى الحضانة بشكل عام لا يُعد مرتفعًا"},{"name":"حضانة براعم وأزهار","district":"الريان","phone":"+966 58 248 5354","rating":4.0,"reviews":89,"status":"تم التواصل","owner":"طيف","last":"2026-07-01","desire":"","notes":"تم التواصل مع الحاضنة وبإنتظار ابلاغ المديرة والرد"},{"name":"مركز ابداع الصغار","district":"النسيم","phone":"+966 55 088 7776","rating":4.0,"reviews":104,"status":"تم التواصل","owner":"طيف","last":"2026-07-02","desire":"","notes":"تم التواصل وطلب التعريف والزيارة الى المركز ثم تأجيل من قبل المديرة"},{"name":"مركز الكواكب الصغيرة","district":"الياسمين","phone":"+966 55 708 8865","rating":5.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-06-30","desire":"لديه رغبة","notes":"تم التواصل، وتمت الموافقة على استلام الملف التعريفي، إلا أنه لم يتم تلقي أي رد حتى الآن"},{"name":"مركز بنون  - ضيافة اطفال","district":"كافد","phone":"+966 55 666 6373","rating":4.0,"reviews":42,"status":"تم التواصل","owner":"طيف","last":"2026-07-08","desire":"","notes":"تم رفع الملف التعريفي للادارة"},{"name":"مركز زهرة البنفسج","district":"المرسلات","phone":"+966 50 332 0078","rating":4.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-06-30","desire":"لديه رغبة","notes":"تم التواصل، وأبدت إعجابها بكون المنصة سعودية، وأفادت بأنهم يستخدمون حاليًا منصة أمريكية، وطلبت إرسال الملف التعريفي لمشاركته مع حضانات أخرى قد تستفيد من المنصة"},{"name":"مركز صغارنا - ضيافة اطفال","district":"النرجس","phone":"+966 55 018 8809","rating":4.0,"reviews":82,"status":"تم التواصل","owner":"طيف","last":"2026-06-28","desire":"","notes":"ارسال الملف التعريفي وبإنتظار الرد"},{"name":"مركز عالم الطفل","district":"الفلاح","phone":"+966 55 364 0310","rating":4.0,"reviews":0,"status":"تم التواصل","owner":"جودي","last":"2026-06-30","desire":"لا رغبة","notes":"تمت زيارة الحضانة وعرض المنصة، وأبدت المديرة قبولًا مبدئيًا للمنصة، إلا أن مستوى الحضانة والإدارة لا يتوافق مع الفئة المستهدفة"},{"name":"مركز عالم مودة - ضيافة اطفال","district":"الروابي","phone":"+966 55 992 1504","rating":4.0,"reviews":50,"status":"تم التواصل","owner":"طيف","last":"2026-07-01","desire":"","notes":"تم ارسال الملف التعريفي عن طريق الواتس اب - انتظار الرد"},{"name":"مركز مكعبات","district":"قرطبة","phone":"+966 55 206 1001","rating":4.0,"reviews":140,"status":"تم التواصل","owner":"طيف","last":"2026-07-08","desire":"","notes":"تم التواصل مع المديرة وارسال الملف التعريفي"},{"name":"مركز نقطة لعب - ضيافة اطفال","district":"حطين","phone":"+966 55 195 8140","rating":4.4,"reviews":56,"status":"تم التواصل","owner":"طيف","last":"2026-07-08","desire":"","notes":"تم ارسال ايميل لعقد اجتماع تعريفي"},{"name":"مركز الارتقاء - ضيافة اطفال","district":"الرائد","phone":"+966 53 040 0369","rating":4.0,"reviews":117,"status":"لم يتم التواصل","owner":"طيف","last":"2026-07-06","desire":"","notes":""},{"name":"Al-Nahar World Daycare","district":"الملقا","phone":"+966 9200 22756","rating":4.5,"reviews":105,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"Bedayaat Nursery - الملقا","district":"الملقا","phone":"+966 55 256 3966","rating":4.1,"reviews":89,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"Home nursery - أم لمى","district":"المصياف","phone":"+966 55 524 6061","rating":4.8,"reviews":67,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"Latif Kids Day Care","district":"العليا","phone":"+966 50 616 5653","rating":4.5,"reviews":253,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"Saudi Prime Nursery & Academy","district":"الملك سلمان","phone":"+966 57 381 1764","rating":5.0,"reviews":12,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"Second Child School - بيت الطفل","district":"الوادي","phone":"+966 50 718 0200","rating":4.3,"reviews":108,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"الحديقة الحية لضيافة الأطفال - النرجس","district":"النرجس","phone":"+966 54 439 1196","rating":4.0,"reviews":47,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"الروضة الثالثة والثلاثون 33","district":"الملقا","phone":"+966 800 438 8885","rating":4.2,"reviews":24,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"حضانة الخطوة الأولى","district":"العليا","phone":"+966 11 461 5456","rating":4.5,"reviews":199,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"حضانة براعم الملقا","district":"العارض","phone":"+966 55 310 2234","rating":4.1,"reviews":35,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"روضة أرض الطفولة الأهلية","district":"الملقا","phone":"+966 55 103 1515","rating":4.1,"reviews":47,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"ريفروود لضيافة الأطفال","district":"النموذجية","phone":"+966 55 005 6687","rating":4.9,"reviews":41,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"زينة الحياة لضيافة الأطفال","district":"النرجس","phone":"+966 50 093 9207","rating":4.7,"reviews":28,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"مدارس نجوم الإبداع الأهلية - الملقا","district":"الملقا","phone":"+966 53 600 9929","rating":4.5,"reviews":121,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"مركز تكوين لضيافة الأطفال - الرائد","district":"الرائد","phone":"+966 55 818 6020","rating":4.5,"reviews":247,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"مركز رامة لضيافة الأطفال","district":"الملقا","phone":"+966 55 401 7663","rating":4.6,"reviews":61,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"مركز عناقيد الأمل لضيافة الأطفال","district":"الملقا","phone":"+966 55 941 6927","rating":4.9,"reviews":36,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"مركز قلعة الصغار لضيافة الأطفال","district":"النرجس","phone":"+966 50 479 1762","rating":4.0,"reviews":163,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"مركز كيان المستقبل","district":"الرائد","phone":"+966 50 599 6562","rating":4.4,"reviews":174,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"مركز مران لضيافة الأطفال الأهلية","district":"النرجس","phone":"+966 59 420 6293","rating":4.4,"reviews":110,"status":"لم يتم التواصل","owner":"—","last":"","desire":"","notes":""},{"name":"Enchanted Day Care","district":"العليا","phone":"+966 54 287 0777","rating":4.0,"reviews":217,"status":"مرفوض","owner":"طيف","last":"2026-06-21","desire":"لا رغبة","notes":"غير مهتم حاليًا"},{"name":"Littles sky line academy","district":"حي الملك سلمان","phone":"+966 55 083 6844","rating":5.0,"reviews":37,"status":"مرفوض","owner":"طيف","last":"2026-07-08","desire":"لا رغبة","notes":"يوجد لديهم تطبيق خاص"},{"name":"حضانة بيتي الثاني","district":"الريان","phone":"+966 9200 22756","rating":4.0,"reviews":474,"status":"مرفوض","owner":"طيف","last":"2026-06-21","desire":"","notes":"تم التواصل وارسال ايميل - الرد بعدم الاهمية حاليًا"},{"name":"حضانة كرز و توت","district":"الاندلس","phone":"+966 55 253 0957","rating":4.0,"reviews":87,"status":"مرفوض","owner":"طيف","last":"2026-07-02","desire":"لا رغبة","notes":"عدم الاهتمام في الوقت الحالي"},{"name":"حضانة منطقة النجوم","district":"المغرزات","phone":"+966 56 531 7038","rating":4.4,"reviews":131,"status":"مرفوض","owner":"طيف","last":"2026-07-02","desire":"لا رغبة","notes":"عدم الاهتمام في الوقت الحالي"}];

export function computeCounts(rows: PilotRow[]): StatusCounts {
  const c: StatusCounts = {};
  STATUSES.forEach((s) => (c[s] = 0));
  rows.forEach((r) => {
    if (c[r.status] === undefined) c[r.status] = 0;
    c[r.status]++;
  });
  return c;
}

export function computePilotStats(rows: PilotRow[]): PilotStats {
  const c = computeCounts(rows);
  const active = c['بايلوت مفعّل'] || 0;
  const now = new Date();
  const total = PILOT_END.getTime() - PILOT_START.getTime();
  const elapsed = Math.min(Math.max(now.getTime() - PILOT_START.getTime(), 0), total);
  const timePct = Math.round((elapsed / total) * 100);
  const achvPct = Math.min(Math.round((active / 3) * 100), 100);
  return { active, timePct, achvPct, counts: c };
}
