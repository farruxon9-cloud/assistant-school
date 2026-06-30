// Mock Database for School Management System (Assistant School)

export const INITIAL_COURSES = [
  { id: 'c1', name: '2 Yillik Akademik Yapon Tili Kursi (2-Year Academic)', durationMonths: 24, capacity: 80 },
  { id: 'c2', name: '1.5 Yillik Intensiv Yapon Tili Kursi (1.5-Year Intensive)', durationMonths: 18, capacity: 60 },
  { id: 'c3', name: '3 Oylik Qisqa Muddatli Kurs (3-Month Short Term)', durationMonths: 3, capacity: 30 }
];

export const INITIAL_TEACHERS = [
  { id: 't1', name: 'Tanaka Sato', department: 'Yapon Tili Bo\'limi', email: 'tanaka@school.jp' },
  { id: 't2', name: 'Yamamoto Ken', department: 'Matematika Bo\'limi', email: 'yamamoto@school.jp' },
  { id: 't3', name: 'Suzuki Mari', department: 'Ijtimoiy Fanlar Bo\'limi', email: 'suzuki@school.jp' }
];

export const INITIAL_CLASSES = [
  { id: 'cls1', name: 'Sinf 2026-A (Upper Intermediate)', level: 'N2', teacherId: 't1', courseId: 'c1', startDate: '2026-04-01', endDate: '2028-03-31' },
  { id: 'cls2', name: 'Sinf 2026-B (Intermediate)', level: 'N3', teacherId: 't3', courseId: 'c1', startDate: '2026-04-01', endDate: '2028-03-31' },
  { id: 'cls3', name: 'Sinf 2026-C (Beginner)', level: 'N5', teacherId: 't2', courseId: 'c2', startDate: '2026-04-01', endDate: '2027-09-30' }
];

// Generates daily attendance slots for a student
const generateMockAttendance = (basePercentage) => {
  const dates = {};
  const today = new Date('2026-06-30'); // System fixed date representing current system time
  for (let i = 1; i <= 30; i++) {
    const dayStr = `2026-06-${i < 10 ? '0' : ''}${i}`;
    const dayOfWeek = new Date(dayStr).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends
    
    // Determine attendance based on base percentage
    const rand = Math.random() * 100;
    if (rand < basePercentage) {
      // Present for all 4 periods
      dates[dayStr] = ['present', 'present', 'present', 'present'];
    } else if (rand < basePercentage + 10) {
      // Late for period 1, present for others
      dates[dayStr] = ['late', 'present', 'present', 'present'];
    } else {
      // Absent for all periods
      dates[dayStr] = ['absent', 'absent', 'absent', 'absent'];
    }
  }
  return dates;
};

export const INITIAL_STUDENTS = [
  {
    id: '20260001',
    nameEn: 'KANOATOV FARRUX',
    nameJp: 'カノアトフ ファルホ',
    zairyuCardNumber: 'AA12345678BB',
    passportNumber: 'AB9876543',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    birthday: '2001-08-15',
    gender: 'Erkak',
    nationality: 'Uzbekistan',
    visaType: 'Talaba (Student)',
    visaExpiry: '2026-07-25', // Visa expires in 25 days (Visa Alert!)
    address: 'Tokyo-to, Shinjuku-ku, Nishi-Shinjuku 1-1-1',
    entryDate: '2026-04-01',
    entryTerm: '4-Chorak (April)',
    courseId: 'c1',
    classId: 'cls1',
    attendancePercent: 94.5,
    attendance: generateMockAttendance(95),
    grades: {
      internal: { kanji: 'A', listening: 'B', reading: 'A', writing: 'B', total: 'A' },
      jlpt: { date: '2025-12-07', level: 'N3', score: 145, result: 'Pass' },
      eju: { date: '2026-06-20', japanese: 320, math1: 120, general: 150, total: 590 }
    },
    invoices: [
      { id: 'inv1', term: '1-Semestr', amount: 350000, deadline: '2026-03-15', status: 'Paid', paidDate: '2026-03-10' },
      { id: 'inv2', term: '2-Semestr', amount: 350000, deadline: '2026-09-15', status: 'Unpaid', paidDate: null }
    ],
    interviews: [
      { id: 'int1', date: '2026-04-20', interviewer: 'Tanaka Sato', category: 'Yashash sharoiti', notes: 'Talaba Yaponiya hayotiga moslashgan, turar joyi qulay va maktabga yaqin.' },
      { id: 'int2', date: '2026-06-15', interviewer: 'Tanaka Sato', category: 'O\'qish', notes: 'Davomati a\'lo darajada, JLPT N2 imtihoniga tayyorgarlik ko\'rmoqda.' }
    ]
  },
  {
    id: '20260002',
    nameEn: 'ANNA SMITH',
    nameJp: 'アンナ スミス',
    zairyuCardNumber: 'XY98765432ZZ',
    passportNumber: 'CD1234567',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    birthday: '2003-05-20',
    gender: 'Ayol',
    nationality: 'USA',
    visaType: 'Talaba (Student)',
    visaExpiry: '2026-07-10', // Visa expires in 10 days (Urgent Visa Alert!)
    address: 'Tokyo-to, Shibuya-ku, Yoyogi 2-2-2',
    entryDate: '2026-04-01',
    entryTerm: '4-Chorak (April)',
    courseId: 'c1',
    classId: 'cls1',
    attendancePercent: 74.2, // Low Attendance Alert! (< 80%)
    attendance: generateMockAttendance(72),
    grades: {
      internal: { kanji: 'B', listening: 'C', reading: 'B', writing: 'C', total: 'B' },
      jlpt: { date: '2025-12-07', level: 'N4', score: 110, result: 'Pass' },
      eju: { date: '2026-06-20', japanese: 260, math1: 100, general: 110, total: 470 }
    },
    invoices: [
      { id: 'inv3', term: '1-Semestr', amount: 350000, deadline: '2026-03-15', status: 'Paid', paidDate: '2026-03-12' },
      { id: 'inv4', term: '2-Semestr', amount: 350000, deadline: '2026-09-15', status: 'Unpaid', paidDate: null }
    ],
    interviews: [
      { id: 'int3', date: '2026-05-10', interviewer: 'Tanaka Sato', category: 'Davomat', notes: 'Talaba sog\'lig\'i sababli dars qoldirganini ma\'lum qildi. Davomatni yaxshilash shartligi ogohlantirildi.' }
    ]
  },
  {
    id: '20260003',
    nameEn: 'WANG LEI',
    nameJp: 'ワン レイ',
    zairyuCardNumber: 'CN44556677DD',
    passportNumber: 'EF1122334',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    birthday: '2000-11-12',
    gender: 'Erkak',
    nationality: 'China',
    visaType: 'Talaba (Student)',
    visaExpiry: '2027-04-15', // Good visa status
    address: 'Tokyo-to, Toshima-ku, Ikebukuro 3-3-3',
    entryDate: '2026-04-01',
    entryTerm: '4-Chorak (April)',
    courseId: 'c1',
    classId: 'cls2',
    attendancePercent: 98.8,
    attendance: generateMockAttendance(99),
    grades: {
      internal: { kanji: 'A', listening: 'A', reading: 'A', writing: 'A', total: 'A' },
      jlpt: { date: '2025-12-07', level: 'N2', score: 168, result: 'Pass' },
      eju: { date: '2026-06-20', japanese: 360, math1: 160, general: 180, total: 700 }
    },
    invoices: [
      { id: 'inv5', term: '1-Semestr', amount: 350000, deadline: '2026-03-15', status: 'Paid', paidDate: '2026-03-05' }
    ],
    interviews: []
  }
];

export const INITIAL_CALENDAR = {
  holidays: [
    { date: '2026-05-03', name: 'Konstitutsiya Kuni (憲法記念日)' },
    { date: '2026-05-04', name: 'Tabiat Kuni (みどりの日)' },
    { date: '2026-05-05', name: 'Bolalar Kuni (こどもの日)' }
  ],
  schoolClosed: [
    { date: '2026-08-10', reason: 'Yozgi Ta\'til' },
    { date: '2026-08-11', reason: 'Yozgi Ta\'til' },
    { date: '2026-08-12', reason: 'Yozgi Ta\'til' }
  ]
};
