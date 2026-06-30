import React, { useState, useEffect } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_CLASSES,
  INITIAL_COURSES,
  INITIAL_TEACHERS,
  INITIAL_CALENDAR
} from './mockDb';
import { translations } from './translations';

// Icon Components (Premium SVG Inline Icons)
const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
);
const IconStudents = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconClasses = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /><path d="M12 11v6" /><path d="M9 14h6" /></svg>
);
const IconAttendance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
);
const IconGrades = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>
);
const IconFinance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
);
const IconDocuments = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
);

function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('school_lang') || 'uz';
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('school_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [calendar, setCalendar] = useState(INITIAL_CALENDAR);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for adding student form
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: '', nameEn: '', nameJp: '', zairyuCardNumber: '', passportNumber: '',
    birthday: '', gender: 'Male', nationality: '', visaType: 'Talaba (Student)',
    visaExpiry: '', address: '', entryDate: '2026-04-01', entryTerm: '4-Chorak (April)',
    courseId: 'c1', classId: 'cls1', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'
  });

  // State for document printer modal
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printDocType, setPrintDocType] = useState('enrollment'); // enrollment, grades, invoice
  const [printStudent, setPrintStudent] = useState(null);

  // States for attendance grid
  const [attendanceDate, setAttendanceDate] = useState('2026-06-30');
  const [selectedClass, setSelectedClass] = useState('cls1');

  // Translation helper
  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  // Save student updates to localStorage
  useEffect(() => {
    localStorage.setItem('school_students', JSON.stringify(students));
  }, [students]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('school_lang', lang);
  }, [lang]);

  // Helper: visa expiration days calculator
  const getDaysToVisaExpiry = (expiryStr) => {
    const expiry = new Date(expiryStr);
    const today = new Date('2026-06-30'); // System fixed current date
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Mock OCR Auto-fill for Zairyu Card / Passport
  const handleMockOCRScan = (type) => {
    if (type === 'zairyu') {
      setNewStudent(prev => ({
        ...prev,
        nameEn: 'SODIQOV JAHONGIR',
        nameJp: 'ソディコフ ジャホンギル',
        zairyuCardNumber: 'ZA98765432XY',
        passportNumber: 'AC1122334',
        birthday: '2002-12-10',
        gender: 'Male',
        nationality: 'Uzbekistan',
        visaExpiry: '2027-09-18',
        address: 'Tokyo-to, Shibuya-ku, Yoyogi 3-4-5',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
      }));
      alert(lang === 'uz' ? "Zairyu Card skanerlandi! Talaba ma'lumotlari avtomatik to'ldirildi." : "在留カードがスキャンされました！情報が自動入力されました。");
    } else {
      setNewStudent(prev => ({
        ...prev,
        nameEn: 'MOKOVA ELENA',
        nameJp: 'モコワ エレナ',
        zairyuCardNumber: 'RU77889900ZZ',
        passportNumber: 'AB1212123',
        birthday: '2004-03-25',
        gender: 'Female',
        nationality: 'Russia',
        visaExpiry: '2026-07-15',
        address: 'Tokyo-to, Toshima-ku, Sugamo 2-3-4',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80'
      }));
      alert(lang === 'uz' ? "Pasport skanerlandi! Talaba ma'lumotlari avtomatik to'ldirildi." : "パスポートがスキャンされました！情報が自動入力されました。");
    }
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const id = newStudent.id || `202600${students.length + 1}`;
    
    const newStudentObj = {
      ...newStudent,
      id,
      attendancePercent: 100.0,
      attendance: {},
      grades: {
        internal: { kanji: 'A', listening: 'A', reading: 'A', writing: 'A', total: 'A' },
        jlpt: { date: '2025-12-07', level: 'N5', score: 120, result: 'Pass' },
        eju: { date: '2026-06-20', japanese: 250, math1: 100, general: 100, total: 450 }
      },
      invoices: [
        { id: `inv_${Date.now()}`, term: '1-Semestr', amount: 350000, deadline: '2026-08-15', status: 'Unpaid', paidDate: null }
      ],
      interviews: []
    };
    
    setStudents([...students, newStudentObj]);
    setShowAddModal(false);
    // Reset form
    setNewStudent({
      id: '', nameEn: '', nameJp: '', zairyuCardNumber: '', passportNumber: '',
      birthday: '', gender: 'Male', nationality: '', visaType: 'Talaba (Student)',
      visaExpiry: '', address: '', entryDate: '2026-04-01', entryTerm: '4-Chorak (April)',
      courseId: 'c1', classId: 'cls1', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'
    });
  };

  const getVisaAlertCount = () => {
    return students.filter(s => getDaysToVisaExpiry(s.visaExpiry) <= 30).length;
  };

  const getLowAttendanceCount = () => {
    return students.filter(s => s.attendancePercent < 80).length;
  };

  const handleSmartCheckAll = () => {
    const classStudents = students.filter(s => s.classId === selectedClass);
    const updatedStudents = students.map(s => {
      if (s.classId === selectedClass) {
        const studentAttendance = { ...s.attendance };
        studentAttendance[attendanceDate] = ['present', 'present', 'present', 'present'];
        return {
          ...s,
          attendance: studentAttendance,
          attendancePercent: recalculateAttendance(studentAttendance)
        };
      }
      return s;
    });
    setStudents(updatedStudents);
    alert(lang === 'uz' ? `${classStudents.length} ta o'quvchi darsga kelgan deb belgilandi!` : `${classStudents.length}名を出席として登録しました！`);
  };

  const togglePeriodAttendance = (studentId, periodIndex, status) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        const currentAtt = s.attendance[attendanceDate] ? [...s.attendance[attendanceDate]] : ['present', 'present', 'present', 'present'];
        currentAtt[periodIndex] = status;
        const newAttendance = {
          ...s.attendance,
          [attendanceDate]: currentAtt
        };
        return {
          ...s,
          attendance: newAttendance,
          attendancePercent: recalculateAttendance(newAttendance)
        };
      }
      return s;
    });
    setStudents(updated);
  };

  const recalculateAttendance = (attendanceObj) => {
    let totalPeriods = 0;
    let presentPeriods = 0;
    
    Object.values(attendanceObj).forEach(periods => {
      periods.forEach(p => {
        totalPeriods++;
        if (p === 'present') {
          presentPeriods++;
        } else if (p === 'late') {
          presentPeriods += 0.75;
        }
      });
    });

    if (totalPeriods === 0) return 100.0;
    return parseFloat(((presentPeriods / totalPeriods) * 100).toFixed(1));
  };

  return (
    <div className="app-container">
      {/* 1. Sidebar Nav */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span style={{ fontSize: '28px' }}>🏫</span>
          <div className="sidebar-logo-text">Assist School</div>
        </div>
        
        <nav className="sidebar-menu">
          <button 
            className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setSelectedStudent(null); }}
          >
            <IconDashboard /> {t('dashboard')}
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => { setActiveTab('students'); setSelectedStudent(null); }}
          >
            <IconStudents /> {t('students')}
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => { setActiveTab('classes'); setSelectedStudent(null); }}
          >
            <IconClasses /> {t('classes')}
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => { setActiveTab('attendance'); setSelectedStudent(null); }}
          >
            <IconAttendance /> {t('attendance')}
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => { setActiveTab('grades'); setSelectedStudent(null); }}
          >
            <IconGrades /> {t('grades')}
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => { setActiveTab('finance'); setSelectedStudent(null); }}
          >
            <IconFinance /> {t('finance')}
          </button>
          <button 
            className={`sidebar-item ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => { setActiveTab('documents'); setSelectedStudent(null); }}
          >
            <IconDocuments /> {t('documents')}
          </button>
        </nav>

        <div className="sidebar-footer">
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AD</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Admin Uzer</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{lang === 'uz' ? 'Maktab Mudiri' : '学校管理者'}</div>
          </div>
        </div>
      </aside>

      {/* 2. Main content */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontFamily: 'var(--font-heading)' }}>
              {activeTab === 'dashboard' && t('dashboard')}
              {activeTab === 'students' && t('students')}
              {activeTab === 'classes' && t('classes')}
              {activeTab === 'attendance' && t('attendance')}
              {activeTab === 'grades' && t('grades')}
              {activeTab === 'finance' && t('finance')}
              {activeTab === 'documents' && t('documents')}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              {lang === 'uz' ? 'Bugungi sana: 2026-06-30 | Assistant School Avtomatlashtirilgan Tizim' : '本日日付: 2026-06-30 | Assistant School 管理システム'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Language Selector Switch */}
            <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => setLang('uz')}
                style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', background: lang === 'uz' ? 'var(--accent-blue)' : 'transparent', color: '#fff' }}
              >
                UZ
              </button>
              <button 
                onClick={() => setLang('jp')}
                style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', background: lang === 'jp' ? 'var(--accent-blue)' : 'transparent', color: '#fff' }}
              >
                JP
              </button>
            </div>

            {getVisaAlertCount() > 0 && (
              <div className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⚠️ {t('visaAlert')}: {getVisaAlertCount()}
              </div>
            )}
          </div>
        </header>

        {/* Tab Content Router */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Metric widgets */}
            <div className="card-grid">
              <div className="metric-card glass">
                <div className="metric-info">
                  <h3>{t('totalStudents')}</h3>
                  <div className="metric-value">{students.length}</div>
                </div>
                <div className="metric-icon" style={{ color: 'var(--accent-blue)' }}>👥</div>
              </div>
              <div className="metric-card glass">
                <div className="metric-info">
                  <h3>{t('activeClasses')}</h3>
                  <div className="metric-value">{classes.length}</div>
                </div>
                <div className="metric-icon" style={{ color: 'var(--accent-purple)' }}>🏫</div>
              </div>
              <div className="metric-card glass">
                <div className="metric-info">
                  <h3>{t('averageAttendance')}</h3>
                  <div className="metric-value">
                    {(students.reduce((acc, s) => acc + s.attendancePercent, 0) / students.length).toFixed(1)}%
                  </div>
                </div>
                <div className="metric-icon" style={{ color: 'var(--status-success)' }}>📈</div>
              </div>
            </div>

            {/* Main Dashboard Alerts & Lists */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              <div className="glass" style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>⚠️ {t('visaAlertTitle')}</h2>
                
                {/* Visa Danger Alert List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {students.map(s => {
                    const days = getDaysToVisaExpiry(s.visaExpiry);
                    if (days <= 30) {
                      return (
                        <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid var(--status-danger)' }}>
                          <div>
                            <div style={{ fontWeight: '600' }}>{s.nameEn} ({s.nationality})</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{t('zairyuNo')}: {s.zairyuCardNumber}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div className="badge badge-danger">{days} {t('daysLeft')}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{t('visaExpiry')}: {s.visaExpiry}</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}

                  {/* Low Attendance Alert List */}
                  {students.map(s => {
                    if (s.attendancePercent < 80) {
                      return (
                        <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '12px', borderLeft: '4px solid var(--status-warning)' }}>
                          <div>
                            <div style={{ fontWeight: '600' }}>{s.nameEn} ({s.nationality})</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{t('classes')}: {classes.find(c => c.id === s.classId)?.name}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div className="badge badge-warning" style={{ fontSize: '14px' }}>{t('lowAttendance')}: {s.attendancePercent}%</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{lang === 'uz' ? 'Viza xavf ostida!' : '在留資格更新に影響あり'}</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* Today's schedule / Calendar Widget */}
              <div className="glass" style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>📅 {t('todayLessons')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--accent-blue)', fontWeight: '600' }}>09:00 - 10:30 (1-2)</div>
                    <div style={{ fontWeight: '500', marginTop: '4px' }}>{lang === 'uz' ? 'Choraklik Yapon Tili Grammatikasi' : '期末日本語文法授業'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sinf: 2026-A | Tanaka Sato</div>
                  </div>
                  <div style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--accent-blue)', fontWeight: '600' }}>10:45 - 12:15 (3-4)</div>
                    <div style={{ fontWeight: '500', marginTop: '4px' }}>{lang === 'uz' ? 'JLPT Kanzi va Lug\'at Mashg\'uloti' : 'JLPT漢字・語彙演習'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sinf: 2026-A | Suzuki Mari</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '14px', marginTop: '24px', marginBottom: '12px', color: 'var(--text-secondary)' }}>{t('upcomingHolidays')}:</h3>
                {calendar.holidays.map(h => (
                  <div key={h.date} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span>{h.name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{h.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Students Tab */}
        {activeTab === 'students' && !selectedStudent && (
          <div className="glass" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')} 
                className="form-control"
                style={{ maxWidth: '360px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                ➕ {t('addStudent')}
              </button>
            </div>

            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>{t('studentId')}</th>
                    <th>{t('nameEn')}</th>
                    <th>{t('nameJp')}</th>
                    <th>{t('nationality')}</th>
                    <th>{t('zairyuNo')}</th>
                    <th>{t('visaExpiry')}</th>
                    <th>{t('attendancePercent')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students
                    .filter(s => s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || s.nationality.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.includes(searchQuery))
                    .map(s => (
                      <tr key={s.id}>
                        <td>
                          <img src={s.photo} alt={s.nameEn} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        </td>
                        <td>{s.id}</td>
                        <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                        <td>{s.nameJp}</td>
                        <td>{s.nationality}</td>
                        <td><code>{s.zairyuCardNumber}</code></td>
                        <td>
                          <span className={`badge ${getDaysToVisaExpiry(s.visaExpiry) <= 30 ? 'badge-danger' : 'badge-success'}`}>
                            {s.visaExpiry}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${s.attendancePercent < 80 ? 'badge-danger' : 'badge-success'}`}>
                            {s.attendancePercent}%
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setSelectedStudent(s)}>
                            {t('details')}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Selected Student Details View */}
        {selectedStudent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <button className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} onClick={() => setSelectedStudent(null)}>
              ⬅️ {t('backToList')}
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              {/* Left Profile card */}
              <div className="glass" style={{ padding: '24px', textAlign: 'center' }}>
                <img src={selectedStudent.photo} alt={selectedStudent.nameEn} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-blue)', margin: '0 auto 16px' }} />
                <h2 style={{ fontSize: '20px' }}>{selectedStudent.nameEn}</h2>
                <p style={{ color: 'var(--text-secondary)', margin: '4px 0 16px' }}>{selectedStudent.nameJp}</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                  <span className="badge badge-success">{selectedStudent.nationality}</span>
                  <span className="badge badge-warning">{selectedStudent.entryTerm}</span>
                </div>

                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{t('zairyuNo')}</div>
                    <div style={{ fontWeight: '500' }}><code>{selectedStudent.zairyuCardNumber}</code></div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Pasport Raqami</div>
                    <div style={{ fontWeight: '500' }}><code>{selectedStudent.passportNumber}</code></div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{t('visaExpiry')}</div>
                    <div style={{ fontWeight: '500', color: getDaysToVisaExpiry(selectedStudent.visaExpiry) <= 30 ? 'var(--status-danger)' : 'inherit' }}>{selectedStudent.visaExpiry}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{t('formAddress')}</div>
                    <div style={{ fontSize: '13px' }}>{selectedStudent.address}</div>
                  </div>
                </div>
              </div>

              {/* Right panel with sub-tabs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Grades & Performance */}
                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('gradesPerformance')}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('internalGrades')}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>Total: {selectedStudent.grades.internal.total}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Kanji: {selectedStudent.grades.internal.kanji} | Reading: {selectedStudent.grades.internal.reading}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('jlptResult')}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>{selectedStudent.grades.jlpt.level} - {selectedStudent.grades.jlpt.result}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Ball: {selectedStudent.grades.jlpt.score}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('ejuScore')}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>{selectedStudent.grades.eju.total} Ball</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Jpn: {selectedStudent.grades.eju.japanese} | Mat: {selectedStudent.grades.eju.math1}</div>
                    </div>
                  </div>
                </div>

                {/* 2. Interview logs */}
                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('interviewLogs')}</h3>
                  {selectedStudent.interviews.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{t('noInterviews')}</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {selectedStudent.interviews.map(i => (
                        <div key={i.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--accent-purple)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontWeight: '600', fontSize: '14px' }}>{i.category}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{i.date} | Teacher: {i.interviewer}</span>
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}>{i.notes}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Document printing actions */}
                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('generateDocs')}</h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button className="btn btn-secondary" onClick={() => { setPrintDocType('enrollment'); setPrintStudent(selectedStudent); setShowPrintModal(true); }}>
                      {t('docEnrollment')}
                    </button>
                    <button className="btn btn-secondary" onClick={() => { setPrintDocType('grades'); setPrintStudent(selectedStudent); setShowPrintModal(true); }}>
                      {t('docGrades')}
                    </button>
                    <button className="btn btn-secondary" onClick={() => { setPrintDocType('invoice'); setPrintStudent(selectedStudent); setShowPrintModal(true); }}>
                      {t('docInvoice')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Classes & Schedules Tab */}
        {activeTab === 'classes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('classes')}</h2>
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>{t('className')}</th>
                      <th>{t('classLevel')}</th>
                      <th>{t('headTeacher')}</th>
                      <th>{t('courseType')}</th>
                      <th>{t('startDate')}</th>
                      <th>{t('endDate')}</th>
                      <th>{t('studentsCount')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map(c => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: '600' }}>{c.name}</td>
                        <td><span className="badge badge-success">{c.level}</span></td>
                        <td>{teachers.find(t => t.id === c.teacherId)?.name}</td>
                        <td>{courses.find(co => co.id === c.courseId)?.name}</td>
                        <td>{c.startDate}</td>
                        <td>{c.endDate}</td>
                        <td>
                          {students.filter(s => s.classId === c.id).length} {lang === 'uz' ? 'talaba' : '名'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Courses Overview */}
            <div className="glass" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('coursePrograms')}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {courses.map(co => (
                  <div key={co.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '8px' }}>{co.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <span>{t('courseDuration')}: {co.durationMonths} {lang === 'uz' ? 'oy' : 'ヶ月'}</span>
                      <span>{t('classCapacity')}: {co.capacity} {lang === 'uz' ? 'talaba' : '名'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Smart Attendance Tab (Excel Grid) */}
        {activeTab === 'attendance' && (
          <div className="glass" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{t('lessonDate')}</label>
                  <input type="date" className="form-control" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">{t('selectClass')}</label>
                  <select className="form-control" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button className="btn btn-secondary" onClick={handleSmartCheckAll}>
                  {t('checkAllPresent')}
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>{t('studentId')}</th>
                    <th>{t('nameEn')}</th>
                    <th>{t('period1')}</th>
                    <th>{t('period2')}</th>
                    <th>{t('period3')}</th>
                    <th>{t('period4')}</th>
                    <th>{t('monthlyAttendance')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students
                    .filter(s => s.classId === selectedClass)
                    .map(s => {
                      const todayAtt = s.attendance[attendanceDate] || ['present', 'present', 'present', 'present'];
                      return (
                        <tr key={s.id}>
                          <td>{s.id}</td>
                          <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                          {[0, 1, 2, 3].map(pIndex => (
                            <td key={pIndex}>
                              <select 
                                className="form-control" 
                                style={{ padding: '6px', fontSize: '12px', width: '100px' }}
                                value={todayAtt[pIndex]}
                                onChange={(e) => togglePeriodAttendance(s.id, pIndex, e.target.value)}
                              >
                                <option value="present">{lang === 'uz' ? 'Keldi' : '出席'}</option>
                                <option value="late">{lang === 'uz' ? 'Kechikdi' : '遅刻'}</option>
                                <option value="absent">{lang === 'uz' ? 'Kelmadi' : '欠席'}</option>
                              </select>
                            </td>
                          ))}
                          <td>
                            <span className={`badge ${s.attendancePercent < 80 ? 'badge-danger' : 'badge-success'}`}>
                              {s.attendancePercent}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '16px' }}>
              {t('attendanceTip')}
            </div>
          </div>
        )}

        {/* 5. Grades Tab */}
        {activeTab === 'grades' && (
          <div className="glass" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('gradesPerformance')}</h3>
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>{t('studentId')}</th>
                    <th>{t('nameEn')}</th>
                    <th>{t('classes')}</th>
                    <th>Kanji</th>
                    <th>Listening</th>
                    <th>Reading</th>
                    <th>Writing</th>
                    <th>{t('jlptResult')}</th>
                    <th>{t('ejuScore')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                      <td>{classes.find(c => c.id === s.classId)?.name}</td>
                      <td><span className="badge badge-success">{s.grades.internal.kanji}</span></td>
                      <td><span className="badge badge-success">{s.grades.internal.listening}</span></td>
                      <td><span className="badge badge-success">{s.grades.internal.reading}</span></td>
                      <td><span className="badge badge-success">{s.grades.internal.writing}</span></td>
                      <td>
                        <span className="badge badge-warning">{s.grades.jlpt.level} ({s.grades.jlpt.result})</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 'bold' }}>{s.grades.eju.japanese} JPY</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Finance Tab */}
        {activeTab === 'finance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('docInvoice')}</h2>
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>{t('invoiceNo')}</th>
                      <th>{t('studentId')}</th>
                      <th>{t('nameEn')}</th>
                      <th>Semestr/Chorak</th>
                      <th>{t('invoiceAmount')}</th>
                      <th>{t('invoiceDeadline')}</th>
                      <th>{t('invoiceStatus')}</th>
                      <th>{t('paidDate')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.flatMap(s => 
                      s.invoices.map(inv => (
                        <tr key={inv.id}>
                          <td><code>{inv.id}</code></td>
                          <td>{s.id}</td>
                          <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                          <td>{inv.term}</td>
                          <td>¥ {inv.amount.toLocaleString()}</td>
                          <td>{inv.deadline}</td>
                          <td>
                            <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-danger'}`}>
                              {inv.status === 'Paid' ? t('paid') : t('unpaid')}
                            </span>
                          </td>
                          <td>{inv.paidDate || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 7. Documents Tab */}
        {activeTab === 'documents' && (
          <div className="glass" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('generateDocs')}</h2>
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>{t('studentId')}</th>
                    <th>{t('nameEn')}</th>
                    <th>{t('classes')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id}>
                      <td>
                        <img src={s.photo} alt={s.nameEn} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      </td>
                      <td>{s.id}</td>
                      <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                      <td>{classes.find(c => c.id === s.classId)?.name}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType('enrollment'); setPrintStudent(s); setShowPrintModal(true); }}>
                            📜 {lang === 'uz' ? 'O\'qish Joyidan' : '在学証明'}
                          </button>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType('grades'); setPrintStudent(s); setShowPrintModal(true); }}>
                            📊 {lang === 'uz' ? 'Baholar & Davomat' : '成績・出席'}
                          </button>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType('invoice'); setPrintStudent(s); setShowPrintModal(true); }}>
                            💸 {lang === 'uz' ? 'Invoys' : '請求書'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD STUDENT WITH OCR SIMULATOR */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="glass" style={{ width: '90%', maxWidth: '640px', padding: '32px', backgroundColor: 'var(--bg-secondary)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              {t('ocrTitle')}
            </h2>
            
            {/* OCR Scanner simulator buttons */}
            <div style={{ background: 'var(--accent-blue-glow)', padding: '16px', borderRadius: '12px', border: '1px dashed var(--accent-blue)', marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--accent-blue)' }}>{t('ocrTip')}</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => handleMockOCRScan('zairyu')}>
                  {t('ocrScanZairyu')}
                </button>
                <button type="button" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => handleMockOCRScan('passport')}>
                  {t('ocrScanPassport')}
                </button>
              </div>
            </div>

            <form onSubmit={handleAddStudentSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">{t('formNameEn')}</label>
                  <input type="text" className="form-control" required value={newStudent.nameEn} onChange={(e) => setNewStudent({...newStudent, nameEn: e.target.value.toUpperCase()})} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('formNameJp')}</label>
                  <input type="text" className="form-control" required value={newStudent.nameJp} onChange={(e) => setNewStudent({...newStudent, nameJp: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('zairyuNo')}</label>
                  <input type="text" className="form-control" required value={newStudent.zairyuCardNumber} onChange={(e) => setNewStudent({...newStudent, zairyuCardNumber: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Pasport Raqami</label>
                  <input type="text" className="form-control" required value={newStudent.passportNumber} onChange={(e) => setNewStudent({...newStudent, passportNumber: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Tug\'ilgan Sana</label>
                  <input type="date" className="form-control" required value={newStudent.birthday} onChange={(e) => setNewStudent({...newStudent, birthday: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('visaExpiry')}</label>
                  <input type="date" className="form-control" required value={newStudent.visaExpiry} onChange={(e) => setNewStudent({...newStudent, visaExpiry: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('classes')}</label>
                  <select className="form-control" value={newStudent.classId} onChange={(e) => setNewStudent({...newStudent, classId: e.target.value})}>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('nationality')}</label>
                  <input type="text" className="form-control" required value={newStudent.nationality} onChange={(e) => setNewStudent({...newStudent, nationality: e.target.value})} />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '12px' }}>
                <label className="form-label">{t('formAddress')}</label>
                <input type="text" className="form-control" required value={newStudent.address} onChange={(e) => setNewStudent({...newStudent, address: e.target.value})} />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>{t('cancel')}</button>
                <button type="submit" className="btn btn-primary">{t('save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DOCUMENT PRINT PREVIEW (QR + MUHR) */}
      {showPrintModal && printStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '800px', margin: '40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
              <h3>{t('printPreviewTitle')}</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" onClick={() => window.print()}>{t('btnPrint')}</button>
                <button className="btn btn-secondary" onClick={() => { setShowPrintModal(false); setPrintStudent(null); }}>{t('btnClose')}</button>
              </div>
            </div>

            {/* Print paper mockup wrapper */}
            <div className="print-paper" style={{ background: '#fff', color: '#000', padding: '50px', borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', fontFamily: '"Times New Roman", serif', minHeight: '800px', position: 'relative' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '30px' }}>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'bold' }}>ASSISTANT SCHOOL ACADEMIC JAPANESE DEPT</h2>
                <p style={{ fontSize: '13px', fontStyle: 'italic', marginTop: '4px' }}>Tokyo-to, Shinjuku-ku, Nishi-Shinjuku 1-1-1 | Tel: 03-5419-8228</p>
              </div>

              {/* Enrollment Certificate (在学証明書) */}
              {printDocType === 'enrollment' && (
                <div>
                  <h1 style={{ textAlign: 'center', fontSize: '28px', margin: '40px 0', textDecoration: 'underline' }}>在学証明書</h1>
                  
                  <div style={{ margin: '30px 0', fontSize: '16px', lineHeight: '2' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', marginBottom: '10px' }}>
                      <b>氏名 (Name):</b> <span>{printStudent.nameJp} ({printStudent.nameEn})</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', marginBottom: '10px' }}>
                      <b>生年月日 (Birthday):</b> <span>{printStudent.birthday}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', marginBottom: '10px' }}>
                      <b>国籍 (Nationality):</b> <span>{printStudent.nationality}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', marginBottom: '10px' }}>
                      <b>クラス (Class):</b> <span>{classes.find(c => c.id === printStudent.classId)?.name}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '16px', textIndent: '30px', lineHeight: '1.8', marginTop: '40px' }}>
                    上記の者は、当校の日本語学科に在学していることを証明いたします。<br />
                    (Ushbu hujjat orqali tasdiqlanadiki, {printStudent.nameEn} haqiqatan ham Assistant School yapon tili bo'limining faol o'quvchisi hisoblanadi.)
                  </p>
                </div>
              )}

              {/* Grades & Attendance Certificate (成績・出席証明書) */}
              {printDocType === 'grades' && (
                <div>
                  <h1 style={{ textAlign: 'center', fontSize: '24px', margin: '30px 0', textDecoration: 'underline' }}>成績・出席証明書</h1>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px', fontSize: '14px' }}>
                    <div><b>氏名 (Name):</b> {printStudent.nameJp}</div>
                    <div><b>学籍番号 (ID):</b> {printStudent.id}</div>
                    <div><b>クラス (Class):</b> {classes.find(c => c.id === printStudent.classId)?.name}</div>
                    <div><b>出席率 (Attendance):</b> {printStudent.attendancePercent}%</div>
                  </div>

                  <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '6px', margin: '20px 0 10px' }}>成績判定 (Grades)</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                    <thead>
                      <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ border: '1px solid #000', padding: '8px' }}>漢字 (Kanji)</th>
                        <th style={{ border: '1px solid #000', padding: '8px' }}>聴解 (Listening)</th>
                        <th style={{ border: '1px solid #000', padding: '8px' }}>読解 (Reading)</th>
                        <th style={{ border: '1px solid #000', padding: '8px' }}>記述 (Writing)</th>
                        <th style={{ border: '1px solid #000', padding: '8px' }}>総合 (GPA)</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{printStudent.grades.internal.kanji}</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{printStudent.grades.internal.listening}</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{printStudent.grades.internal.reading}</td>
                        <td style={{ border: '1px solid #000', padding: '8px' }}>{printStudent.grades.internal.writing}</td>
                        <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>{printStudent.grades.internal.total}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '6px', margin: '20px 0 10px' }}>外部試験成績 (External Exams)</h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    <b>JLPT (日本語能力試験):</b> {printStudent.grades.jlpt.level} ({printStudent.grades.jlpt.result}, Score: {printStudent.grades.jlpt.score}) <br />
                    <b>EJU (日本留学試験):</b> 日本語: {printStudent.grades.eju.japanese}点 | 数学: {printStudent.grades.eju.math1}点 | 総合科目: {printStudent.grades.eju.general}点 (合計: {printStudent.grades.eju.total}点)
                  </p>
                </div>
              )}

              {/* Invoice Preview */}
              {printDocType === 'invoice' && (
                <div>
                  <h1 style={{ textAlign: 'center', fontSize: '28px', margin: '30px 0', textDecoration: 'underline' }}>請求書 (Tuition Invoice)</h1>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px', fontSize: '14px' }}>
                    <div>
                      <b>宛先 (Student):</b><br />
                      氏名: {printStudent.nameJp} ({printStudent.nameEn})<br />
                      学籍番号: {printStudent.id}<br />
                      国籍: {printStudent.nationality}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <b>振込先 (Bank Info):</b><br />
                      ASSISTANT SCHOOL<br />
                      Sumitomo Mitsui Bank, Shinjuku Branch<br />
                      Account: 10537XX (Ordinary)
                    </div>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
                    <thead>
                      <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #000' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>内容 (Details)</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>金額 (Amount JPY)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px' }}>学費・授業料 (Tuition fee)</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>¥ 350,000</td>
                      </tr>
                      <tr style={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>
                        <td style={{ padding: '12px' }}>合計金額 (Total):</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>¥ 350,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Verification & Stamp Area */}
              <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                {/* QR Code generator */}
                <div style={{ border: '2px solid #000', padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://assistant-school.jp/verify/${printStudent.id}`} alt="QR Verification" style={{ width: '70px', height: '70px' }} />
                  <span style={{ fontSize: '9px', fontWeight: 'bold' }}>{t('authenticityVerification')}</span>
                </div>

                {/* Director Muhr stamp */}
                <div style={{ textAlign: 'center', position: 'relative', paddingRight: '40px' }}>
                  <div style={{ fontSize: '14px', marginBottom: '40px' }}>{t('date')}: 2026-06-30</div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{t('schoolDirector')}: 佐藤 太郎</div>
                  {/* Circle red Japanese stamp design */}
                  <div style={{ position: 'absolute', right: '10px', bottom: '-15px', width: '50px', height: '50px', border: '2px solid #ff0000', borderRadius: '50%', color: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 'bold', transform: 'rotate(-15deg)', opacity: 0.85 }}>
                    佐藤之印
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
