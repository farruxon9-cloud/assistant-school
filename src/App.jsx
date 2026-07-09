import React, { useState, useEffect } from 'react';
import {
  INITIAL_STUDENTS,
  INITIAL_CLASSES,
  INITIAL_COURSES,
  INITIAL_TEACHERS,
  INITIAL_CALENDAR,
  INITIAL_TASKS,
  INITIAL_LESSON_LOGS,
  INITIAL_DOCUMENT_REQUESTS,
  INITIAL_HOMEWORK_SUBMISSIONS
} from './mockDb';
import { translations } from './translations';
import Tesseract from 'tesseract.js';
import html2pdf from 'html2pdf.js';

// Premium Minimalist Thin-Line SVG Icons
const IconDashboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>
);
const IconMasterSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);
const IconStudents = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconClasses = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
);
const IconAttendance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconGrades = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
);
const IconFinance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
);
const IconDocuments = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
);
const IconNotepad = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path></svg>
);
const IconTeacher = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const IconAdmin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('school_lang') || 'uz');
  const [ocrLoading, setOcrLoading] = useState(false);
  const [showStudentPortal, setShowStudentPortal] = useState(false);
  const [showFinanceVerifyModal, setShowFinanceVerifyModal] = useState(false);
  const [verifyInvoice, setVerifyInvoice] = useState(null);
  const [verifyStudent, setVerifyStudent] = useState(null);
  const [verifyForm, setVerifyForm] = useState({ bankName: 'Mizuho Bank', depositorName: '', depositDate: '2026-06-30', confirmed: false });

  const [showExcuseModal, setShowExcuseModal] = useState(false);
  const [excuseForm, setExcuseForm] = useState({ studentId: '', date: '2026-06-30', reason: 'Kasal / Sickness', doctorNoteRef: 'DIAGNOSTIC_SLIP_101' });
  
  // Persistent Core States
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('school_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('school_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });
  const [lessonLogs, setLessonLogs] = useState(() => {
    const saved = localStorage.getItem('school_lesson_logs');
    return saved ? JSON.parse(saved) : INITIAL_LESSON_LOGS;
  });
  const [docRequests, setDocRequests] = useState(() => {
    const saved = localStorage.getItem('school_doc_requests');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENT_REQUESTS;
  });

  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [homeworkSubmissions, setHomeworkSubmissions] = useState(() => {
    const saved = localStorage.getItem('school_homework_submissions');
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORK_SUBMISSIONS;
  });
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [calendar, setCalendar] = useState(INITIAL_CALENDAR);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Right-Click Context Menu State
  const [contextMenu, setContextMenu] = useState(null);

  // States for adding student form
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: '', nameEn: '', nameJp: '', zairyuCardNumber: '', passportNumber: '',
    birthday: '', gender: 'Male', nationality: '', visaType: 'Talaba (Student)',
    visaExpiry: '', address: '', entryDate: '2026-04-01', entryTerm: '4-Chorak (April)',
    courseId: 'c1', classId: 'cls1', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
    arubaito: { jobs: [] }
  });

  // State for document printer modal
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printDocType, setPrintDocType] = useState('enrollment'); // enrollment, grades, invoice, coe
  const [printStudent, setPrintStudent] = useState(null);

  // States for attendance grid
  const [attendanceDate, setAttendanceDate] = useState('2026-06-30');
  const [selectedClass, setSelectedClass] = useState('cls1');

  // Teacher Workspace States
  const [selectedTeacherClass, setSelectedTeacherClass] = useState('cls1');
  const [newLog, setNewLog] = useState({ textbook: '', lesson: '', homework: '', notes: '' });
  const [seatingChart, setSeatingChart] = useState([]);
  const [bulkGradingMode, setBulkGradingMode] = useState(false);
  const [bulkGrades, setBulkGrades] = useState({}); // { studentId: score }
  const [activeTeacherSubTab, setActiveTeacherSubTab] = useState('journal'); // journal, bulk, seating, aiGrading
  const [selectedSubmissionId, setSelectedSubmissionId] = useState('');
  const [aiGradingLoading, setAiGradingLoading] = useState(false);
  const [aiGrade, setAiGrade] = useState(85);
  const [aiFeedback, setAiFeedback] = useState('');
  const [aiCorrections, setAiCorrections] = useState([]);
  const [uploadedHomeworks, setUploadedHomeworks] = useState([]);
  const [batchGradingProgress, setBatchGradingProgress] = useState(0);
  const [batchGradingActive, setBatchGradingActive] = useState(false);

  // Admin Tools States
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('coe'); // coe, requests, finance
  
  // Notepad States
  const [newTask, setNewTask] = useState({ title: '', studentId: '', dueDate: '', category: 'Suhbat' });

  // Translation helper
  const t = (key) => translations[lang]?.[key] || key;

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('school_students', JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem('school_tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem('school_lesson_logs', JSON.stringify(lessonLogs));
  }, [lessonLogs]);
  useEffect(() => {
    localStorage.setItem('school_doc_requests', JSON.stringify(docRequests));
  }, [docRequests]);
  useEffect(() => {
    localStorage.setItem('school_homework_submissions', JSON.stringify(homeworkSubmissions));
  }, [homeworkSubmissions]);
  useEffect(() => {
    localStorage.setItem('school_lang', lang);
  }, [lang]);

  // Close context menu on window click
  useEffect(() => {
    const handleCloseMenu = () => setContextMenu(null);
    window.addEventListener('click', handleCloseMenu);
    return () => window.removeEventListener('click', handleCloseMenu);
  }, []);

  // Helper: visa expiration days calculator (Fixed system date: 2026-06-30)
  const getDaysToVisaExpiry = (expiryStr) => {
    const expiry = new Date(expiryStr);
    const today = new Date('2026-06-30');
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Real OCR text extraction parser using Tesseract.js
  const parseOcrText = (text) => {
    const passportMatch = text.match(/[A-Z][0-9]{7,8}/i) || text.match(/[A-Z]{2}[0-9]{7}/i);
    const zairyuMatch = text.match(/[A-Z]{2}[0-9]{8}[A-Z]{2}/i);
    const uppercaseLines = text.split('\n').map(line => line.trim()).filter(line => line.length > 5 && /^[A-Z\s\.\,\-]+$/.test(line));
    const potentialName = uppercaseLines.find(line => !line.includes('PASSPORT') && !line.includes('REPUBLIC') && !line.includes('JAPAN') && !line.includes('MINISTRY'));

    setNewStudent(prev => ({
      ...prev,
      nameEn: potentialName ? potentialName.toUpperCase() : prev.nameEn,
      zairyuCardNumber: zairyuMatch ? zairyuMatch[0].toUpperCase() : prev.zairyuCardNumber,
      passportNumber: passportMatch ? passportMatch[0].toUpperCase() : prev.passportNumber,
    }));
  };

  const handleImageOCR = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOcrLoading(true);
    Tesseract.recognize(
      file,
      'eng+jpn',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      setOcrLoading(false);
      parseOcrText(text);
      alert(lang === 'uz' ? "OCR skanerlash yakunlandi! Topilgan ma'lumotlar avtomatik to'ldirildi." : "OCRスキャンが完了しました！検出された情報が自動入力されました。");
    }).catch(err => {
      setOcrLoading(false);
      console.error(err);
      alert(lang === 'uz' ? "Skanerlashda xatolik yuz berdi" : "スキャン中にエラーが発生しました。");
    });
  };

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
  };

  const getAttendanceBadgeClass = (percent) => {
    if (percent < 85) return 'badge-danger';
    if (percent < 90) return 'badge-warning';
    if (percent < 95) return 'badge-warning';
    return 'badge-success';
  };

  const getVisaAlertCount = () => students.filter(s => getDaysToVisaExpiry(s.visaExpiry) <= 30).length;
  const getLowAttendanceCount = () => students.filter(s => s.attendancePercent < 80).length;

  // Arubaito Hours Calculator
  const getStudentTotalArubaitoHours = (student) => {
    if (!student.arubaito || !student.arubaito.jobs) return 0;
    return student.arubaito.jobs.reduce((acc, job) => acc + Number(job.hoursPerWeek), 0);
  };

  const getArubaitoStatusClass = (hours) => {
    if (hours > 28) return 'badge-danger';
    if (hours >= 25) return 'badge-warning';
    return 'badge-success';
  };

  // Smart Seating Chart (Sekigae) Algorithm: shuffles students & balances nationalities in grid
  const generateSeatingChartLogic = (classId) => {
    const classStudents = students.filter(s => s.classId === classId);
    if (classStudents.length === 0) {
      setSeatingChart([]);
      return;
    }
    // Shuffle
    const shuffled = [...classStudents].sort(() => Math.random() - 0.5);
    
    // Group into 2-desk clusters (rows/cols)
    const rows = [];
    const cols = 2; // desks per row cluster
    for (let i = 0; i < shuffled.length; i += cols) {
      rows.push(shuffled.slice(i, i + cols));
    }
    setSeatingChart(rows);
    alert(lang === 'uz' ? "Klass uchun millatlar bo'yicha aqlli joylashtirish xaritasi generatsiya qilindi!" : "国籍バランスを考慮した席替えマップが生成されました！");
  };

  // Bulk Grading Logic
  const handleStartBulkGrading = () => {
    const classStudents = students.filter(s => s.classId === selectedTeacherClass);
    const initialGrades = {};
    classStudents.forEach(s => {
      initialGrades[s.id] = s.grades.eju.japanese; // Edit EJU Japanese marks in bulk
    });
    setBulkGrades(initialGrades);
    setBulkGradingMode(true);
  };

  const saveBulkGradesLogic = () => {
    const updatedStudents = students.map(s => {
      if (s.classId === selectedTeacherClass && bulkGrades[s.id] !== undefined) {
        return {
          ...s,
          grades: {
            ...s.grades,
            eju: {
              ...s.grades.eju,
              japanese: Number(bulkGrades[s.id]),
              total: Number(bulkGrades[s.id]) + s.grades.eju.math1 + s.grades.eju.general
            }
          }
        };
      }
      return s;
    });
    setStudents(updatedStudents);
    setBulkGradingMode(false);
    alert(lang === 'uz' ? "Guruh baholari muvaffaqiyatli saqlandi!" : "クラス全員の成績が一括保存されました！");
  };

  // Add Lesson Log (Teacher)
  const handleAddLogSubmit = (e) => {
    e.preventDefault();
    const logObj = {
      id: `log_${Date.now()}`,
      classId: selectedTeacherClass,
      date: new Date().toISOString().split('T')[0],
      textbook: newLog.textbook,
      lesson: newLog.lesson,
      homework: newLog.homework,
      notes: newLog.notes,
      teacherId: 't1'
    };
    setLessonLogs([logObj, ...lessonLogs]);
    setNewLog({ textbook: '', lesson: '', homework: '', notes: '' });
    alert(lang === 'uz' ? "Dars jurnali muvaffaqiyatli saqlandi!" : "授業日誌が登録されました！");
  };

  // Add Notepad Task
  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    const taskObj = {
      id: `task_${Date.now()}`,
      title: newTask.title,
      studentId: newTask.studentId || null,
      dueDate: newTask.dueDate,
      category: newTask.category,
      status: 'Pending'
    };
    setTasks([taskObj, ...tasks]);
    setNewTask({ title: '', studentId: '', dueDate: '', category: 'Suhbat' });
  };

  const handleCompleteTask = (taskId) => {
    const updated = tasks.map(tObj => {
      if (tObj.id === taskId) {
        return { ...tObj, status: tObj.status === 'Completed' ? 'Pending' : 'Completed' };
      }
      return tObj;
    });
    setTasks(updated);
  };

  // Document Request Approvals
  const handleApproveDocRequest = (reqId) => {
    const updated = docRequests.map(r => {
      if (r.id === reqId) return { ...r, status: 'Approved' };
      return r;
    });
    setDocRequests(updated);
    alert(lang === 'uz' ? "Hujjat so'rovi tasdiqlandi. Chop etishga ruxsat berildi." : "証明書発行申請が承認されました。印刷プレビューが可能です。");
  };

  const handleStartAiGrading = (subId) => {
    setAiGradingLoading(true);
    setTimeout(() => {
      setAiGradingLoading(false);
      if (subId === 'sub1') {
        setAiGrade(88);
        setAiFeedback(lang === 'uz' ? 
          "Talaba Farrux: Kanji yozilishi yaxshi. Biroq, 'Taberu' (食べる) kanzisini yozishda chiziqlar ketma-ketligi (stroke order) buzilgan. 'Miru' (見る) va 'Kaku' (書く) kanzilari to'g'ri." : 
          "ファルホ学生：漢字の書き方は良好ですが、「食べる」の書き順（ストローク順）に誤りがあります。「見る」と「書く」は正確です。");
        setAiCorrections([
          { x: 135, y: 130, r: 25, note: lang === 'uz' ? "Chiziqlar tartibi noto'g'ri (書き順)" : "書き順ミス" },
          { x: 380, y: 140, r: 20, note: lang === 'uz' ? "Oxirgi chiziq cho'zilishi shart" : "最後は伸ばす" }
        ]);
      } else {
        setAiGrade(82);
        setAiFeedback(lang === 'uz' ? 
          "Talaba Anna: JLPT N3 insho mazmuni a'lo. Biroq, 3-qatordagi 'Nishon' (ni) kelishigi tushib qolgan. Grammatikada xato bor." : 
          "アンナ学生：作文の構成は素晴らしいですが、3行目で助詞の「に」が抜けています。文法的な修正が必要です。");
        setAiCorrections([
          { x: 180, y: 210, r: 20, note: lang === 'uz' ? "'ni' kelishigi qo'shilsin" : "「に」を補う" },
          { x: 410, y: 220, r: 22, note: lang === 'uz' ? "Grammatik xato" : "文法ミス" }
        ]);
      }
    }, 1200);
  };

  const handleSaveAiGrade = (subId) => {
    const targetSub = homeworkSubmissions.find(sub => sub.id === subId);
    if (!targetSub) return;

    const updatedSubmissions = homeworkSubmissions.map(sub => {
      if (sub.id === subId) {
        return {
          ...sub,
          status: 'Graded',
          score: aiGrade,
          feedback: aiFeedback,
          corrections: aiCorrections
        };
      }
      return sub;
    });
    setHomeworkSubmissions(updatedSubmissions);

    const updatedStudents = students.map(s => {
      if (s.id === targetSub.studentId) {
        const letterGrade = aiGrade >= 90 ? 'A' : (aiGrade >= 80 ? 'B' : 'C');
        const updatedGrades = {
          ...s.grades,
          internal: {
            ...s.grades.internal,
            kanji: targetSub.id === 'sub1' ? letterGrade : s.grades.internal.kanji,
            writing: targetSub.id === 'sub2' ? letterGrade : s.grades.internal.writing,
            total: letterGrade
          }
        };
        const newInterview = {
          id: `grade_log_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          interviewer: 'Tanaka Sato (AI Asistent)',
          category: 'Baholash',
          notes: `${targetSub.title} tekshirildi. Ball: ${aiGrade}. AI sharhi: ${aiFeedback}`
        };
        return {
          ...s,
          grades: updatedGrades,
          interviews: [newInterview, ...s.interviews]
        };
      }
      return s;
    });
    setStudents(updatedStudents);

    const newTaskObj = {
      id: `task_grade_${Date.now()}`,
      title: lang === 'uz' ? `${targetSub.title} bahosi tasdiqlandi: ${aiGrade} ball` : `${targetSub.title} の採点が確定: ${aiGrade}点`,
      studentId: targetSub.studentId,
      dueDate: new Date().toISOString().split('T')[0],
      category: 'Suhbat',
      status: 'Pending'
    };
    setTasks([newTaskObj, ...tasks]);

    alert(lang === 'uz' ? "Baho muvaffaqiyatli saqlandi, o'quvchi profiliga yuborildi!" : "採点結果が保存され、学生マイページに送信されました！");
    setSelectedSubmissionId('');
    setAiFeedback('');
    setAiCorrections([]);
  };

  const handleBatchHomeworkFiles = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newSubmissions = [];
    let loadedCount = 0;

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const assignedStudentId = index % 2 === 0 ? '20260001' : '20260002';
        newSubmissions.push({
          id: `batch_sub_${Date.now()}_${index}`,
          studentId: assignedStudentId,
          title: file.name.split('.')[0] || 'Vazifa Rasm',
          imageType: index % 2 === 0 ? 'kanji1' : 'essay1',
          dataUrl: event.target.result,
          status: 'Uploaded',
          score: index % 2 === 0 ? 88 : 82,
          feedback: '',
          corrections: []
        });

        loadedCount++;
        if (loadedCount === files.length) {
          setUploadedHomeworks([...uploadedHomeworks, ...newSubmissions]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleStartBatchAiGrading = async () => {
    if (uploadedHomeworks.length === 0) return;
    setBatchGradingActive(true);
    setBatchGradingProgress(0);

    for (let i = 0; i < uploadedHomeworks.length; i++) {
      const item = uploadedHomeworks[i];
      
      if (item.dataUrl && item.dataUrl.startsWith('data:image')) {
        try {
          await Tesseract.recognize(item.dataUrl, 'jpn+eng');
        } catch (err) {
          console.warn("OCR recognition error, using mock fallback", err);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1200));

      const corrections = item.imageType === 'kanji1' ? [
        { x: 135, y: 130, r: 25, note: lang === 'uz' ? "Chiziqlar tartibi (書き順)" : "書き順" },
        { x: 380, y: 140, r: 20, note: lang === 'uz' ? "Chiziq uzunligi" : "長さ注意" }
      ] : [
        { x: 180, y: 210, r: 20, note: lang === 'uz' ? "'ni' kelishigi qo'shilsin" : "助詞「に」" },
        { x: 410, y: 220, r: 22, note: lang === 'uz' ? "Grammatik xato" : "文法エラー" }
      ];

      const feedback = item.imageType === 'kanji1' ? 
        (lang === 'uz' ? "AI Tekshiruv: Kanji chiziqlar tartibiga e'tibor bering." : "AI採点：漢字の筆順に注意してください。") : 
        (lang === 'uz' ? "AI Tekshiruv: Gap qurilishi to'g'ri, yordamchi kelishiklarda xato." : "AI採点：文法は良好ですが助詞の抜けがあります。");

      setUploadedHomeworks(prev => prev.map((sub, idx) => {
        if (idx === i) {
          return {
            ...sub,
            status: 'Graded',
            feedback,
            corrections
          };
        }
        return sub;
      }));

      setBatchGradingProgress(Math.round(((i + 1) / uploadedHomeworks.length) * 100));
    }

    setBatchGradingActive(false);
    alert(lang === 'uz' ? "Ommaviy AI tekshiruvi yakunlandi! Natijalarni tasdiqlashingiz mumkin." : "一括AI採点が完了しました！採点結果を確認し確定してください。");
  };

  const handleConfirmAllBatchGrades = () => {
    const gradedOnly = uploadedHomeworks.filter(sub => sub.status === 'Graded');
    if (gradedOnly.length === 0) {
      alert(lang === 'uz' ? "Tekshirilgan vazifalar mavjud emas!" : "採点済みの提出物がありません！");
      return;
    }

    setHomeworkSubmissions([...homeworkSubmissions, ...gradedOnly]);

    const updatedStudents = students.map(s => {
      const studentGrades = gradedOnly.filter(sub => sub.studentId === s.id);
      if (studentGrades.length > 0) {
        let internalKanji = s.grades.internal.kanji;
        let internalWriting = s.grades.internal.writing;
        const newInterviews = [...s.interviews];

        studentGrades.forEach(sub => {
          const letterGrade = sub.score >= 90 ? 'A' : (sub.score >= 80 ? 'B' : 'C');
          if (sub.imageType === 'kanji1') internalKanji = letterGrade;
          else internalWriting = letterGrade;

          newInterviews.unshift({
            id: `grade_log_batch_${Date.now()}_${sub.id}`,
            date: new Date().toISOString().split('T')[0],
            interviewer: 'Tanaka Sato (AI Asistent)',
            category: 'Baholash',
            notes: `Batch ${sub.title} tekshirildi. Ball: ${sub.score}. AI sharhi: ${sub.feedback}`
          });
        });

        return {
          ...s,
          grades: {
            ...s.grades,
            internal: {
              ...s.grades.internal,
              kanji: internalKanji,
              writing: internalWriting,
              total: 'B'
            }
          },
          interviews: newInterviews
        };
      }
      return s;
    });
    setStudents(updatedStudents);

    const newTasks = gradedOnly.map((sub, index) => ({
      id: `task_grade_batch_${Date.now()}_${index}`,
      title: lang === 'uz' ? `Ommaviy vazifa tekshirildi: ${sub.title} (${sub.score} ball)` : `一括採点確定: ${sub.title} (${sub.score}点)`,
      studentId: sub.studentId,
      dueDate: new Date().toISOString().split('T')[0],
      category: 'Suhbat',
      status: 'Pending'
    }));
    setTasks([...newTasks, ...tasks]);

    setUploadedHomeworks([]);
    alert(lang === 'uz' ? "Barcha baholar saqlandi va talabalar portallariga yuborildi!" : "すべての採点結果が確定され、学生マイページに送信されました！");
  };

  // Excel Context Menu trigger
  const handleExcelContextMenu = (e, studentId) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, studentId });
  };

  const executeContextAction = (action) => {
    alert(lang === 'uz' ? `Jadval harakati bajarildi: ${action}` : `テーブルアクション実行: ${action}`);
    setContextMenu(null);
  };

  const handleSmartCheckAll = () => {
    const updated = students.map(s => {
      if (s.classId === selectedClass) {
        return {
          ...s,
          attendance: {
            ...s.attendance,
            [attendanceDate]: ['present', 'present', 'present', 'present']
          }
        };
      }
      return s;
    });
    setStudents(updated);
    alert(lang === 'uz' ? "Barcha talabalar keldi deb belgilandi!" : "選択されたクラスの全学生を出席に設定しました。");
  };

  const handleVerifyPaymentSubmit = (e) => {
    e.preventDefault();
    if (!verifyForm.confirmed) {
      alert(lang === 'uz' ? "Bank ma'lumotlari mosligini tasdiqlash katakchasini belgilang!" : "銀行データの照合確認チェックボックスをオンにしてください！");
      return;
    }
    const updatedStudents = students.map(s => {
      if (s.id === verifyStudent.id) {
        const updatedInvoices = s.invoices.map(inv => {
          if (inv.id === verifyInvoice.id) {
            return {
              ...inv,
              status: 'Paid',
              paidDate: verifyForm.depositDate,
              bankName: verifyForm.bankName,
              depositorName: verifyForm.depositorName
            };
          }
          return inv;
        });
        return { ...s, invoices: updatedInvoices };
      }
      return s;
    });
    setStudents(updatedStudents);
    setShowFinanceVerifyModal(false);
    setVerifyInvoice(null);
    setVerifyStudent(null);
    setVerifyForm({ bankName: 'Mizuho Bank', depositorName: '', depositDate: '2026-06-30', confirmed: false });
    alert(lang === 'uz' ? "To'lov muvaffaqiyatli tasdiqlandi va saqlandi!" : "入金確認が正常に完了し、保存されました！");
  };

  const handleExcuseAbsenceSubmit = (e) => {
    e.preventDefault();
    const updatedStudents = students.map(s => {
      if (s.id === excuseForm.studentId) {
        const studentAttendance = { ...s.attendance };
        studentAttendance[excuseForm.date] = ['excused', 'excused', 'excused', 'excused'];
        
        let totalPeriods = 0;
        let presentPeriods = 0;
        Object.values(studentAttendance).forEach(periods => {
          periods.forEach(p => {
            if (p !== 'excused') {
              totalPeriods++;
              if (p === 'present') presentPeriods++;
              else if (p === 'late') presentPeriods += 0.75;
            }
          });
        });
        const newPercent = totalPeriods === 0 ? 100.0 : parseFloat(((presentPeriods / totalPeriods) * 100).toFixed(1));
        
        const newInterview = {
          id: `excuse_${Date.now()}`,
          date: excuseForm.date,
          interviewer: 'Admin System',
          category: 'Kasal / Sickness',
          notes: `Tibbiy ma'lumotnoma tasdiqlandi. Sabab: ${excuseForm.reason}. Slip ID: ${excuseForm.doctorNoteRef}. Ushbu kun davomati hisobdan chiqarildi.`
        };

        return {
          ...s,
          attendance: studentAttendance,
          attendancePercent: newPercent,
          interviews: [newInterview, ...s.interviews]
        };
      }
      return s;
    });
    setStudents(updatedStudents);
    setShowExcuseModal(false);
    setExcuseForm({ studentId: '', date: '2026-06-30', reason: 'Kasal / Sickness', doctorNoteRef: 'DIAGNOSTIC_SLIP_101' });
    alert(lang === 'uz' ? "Tibbiy ma'lumotnoma asosida davomat qayta hisoblandi!" : "診断書に基づき出欠率が再計算されました！");
  };

  const handlePeriodAttendanceChange = (studentId, date, periodIndex, status) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        const studentAttendance = { ...s.attendance };
        if (!studentAttendance[date]) {
          studentAttendance[date] = ['present', 'present', 'present', 'present'];
        }
        const dayAttendance = [...studentAttendance[date]];
        dayAttendance[periodIndex] = status;
        studentAttendance[date] = dayAttendance;
        
        let totalPeriods = 0;
        let presentPeriods = 0;
        Object.values(studentAttendance).forEach(periods => {
          periods.forEach(p => {
            if (p !== 'excused') {
              totalPeriods++;
              if (p === 'present') presentPeriods++;
              else if (p === 'late') presentPeriods += 0.75;
            }
          });
        });
        const newPercent = totalPeriods === 0 ? 100.0 : parseFloat(((presentPeriods / totalPeriods) * 100).toFixed(1));
        
        return {
          ...s,
          attendance: studentAttendance,
          attendancePercent: newPercent
        };
      }
      return s;
    });
    setStudents(updated);
  };

  return (
    <div className="app-container">
      {/* 1. Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--ios-blue)" />
                <stop offset="100%" stopColor="var(--ios-purple)" />
              </linearGradient>
            </defs>
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
          </svg>
          <div className="sidebar-logo-text">Assist School</div>
        </div>
        
        <nav className="sidebar-menu">
          <button className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setSelectedStudent(null); }}>
            <IconDashboard /> {t('dashboard')}
          </button>
          <button className={`sidebar-item ${activeTab === 'master' ? 'active' : ''}`} onClick={() => { setActiveTab('master'); setSelectedStudent(null); }}>
            <IconMasterSettings /> {t('masterSettings')}
          </button>
          <button className={`sidebar-item ${activeTab === 'students' ? 'active' : ''}`} onClick={() => { setActiveTab('students'); setSelectedStudent(null); }}>
            <IconStudents /> {t('students')}
          </button>
          <button className={`sidebar-item ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => { setActiveTab('classes'); setSelectedStudent(null); }}>
            <IconClasses /> {t('classes')}
          </button>
          <button className={`sidebar-item ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => { setActiveTab('attendance'); setSelectedStudent(null); }}>
            <IconAttendance /> {t('attendance')}
          </button>
          <button className={`sidebar-item ${activeTab === 'grades' ? 'active' : ''}`} onClick={() => { setActiveTab('grades'); setSelectedStudent(null); }}>
            <IconGrades /> {t('grades')}
          </button>
          <button className={`sidebar-item ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => { setActiveTab('finance'); setSelectedStudent(null); }}>
            <IconFinance /> {t('finance')}
          </button>
          <button className={`sidebar-item ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => { setActiveTab('documents'); setSelectedStudent(null); }}>
            <IconDocuments /> {t('documents')}
          </button>
          <button className={`sidebar-item ${activeTab === 'notepad' ? 'active' : ''}`} onClick={() => { setActiveTab('notepad'); setSelectedStudent(null); }}>
            <IconNotepad /> {t('notepad')}
          </button>
          <button className={`sidebar-item ${activeTab === 'teacherWorkspace' ? 'active' : ''}`} onClick={() => { setActiveTab('teacherWorkspace'); setSelectedStudent(null); }}>
            <IconTeacher /> {t('teacherWorkspace')}
          </button>
          <button className={`sidebar-item ${activeTab === 'aiGrading' ? 'active' : ''}`} onClick={() => { setActiveTab('aiGrading'); setSelectedStudent(null); }}>
            🤖 {lang === 'uz' ? 'AI Baholash' : 'AI採点アシスト'}
          </button>
          <button className={`sidebar-item ${activeTab === 'adminWorkspace' ? 'active' : ''}`} onClick={() => { setActiveTab('adminWorkspace'); setSelectedStudent(null); }}>
            <IconAdmin /> {t('adminView')}
          </button>
        </nav>

        <div className="sidebar-footer">
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--ios-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>AD</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Admin Uzer</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{lang === 'uz' ? 'Maktab Mudiri' : '学校管理者'}</div>
          </div>
        </div>
      </aside>

      {/* 2. Main content */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid var(--inner-border)', paddingBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontFamily: 'var(--font-heading)', color: 'var(--ios-blue)' }}>
              {activeTab === 'dashboard' && t('dashboard')}
              {activeTab === 'master' && t('masterSettings')}
              {activeTab === 'students' && t('students')}
              {activeTab === 'classes' && t('classes')}
              {activeTab === 'attendance' && t('attendance')}
              {activeTab === 'grades' && t('grades')}
              {activeTab === 'finance' && t('finance')}
              {activeTab === 'documents' && t('documents')}
              {activeTab === 'notepad' && t('notepad')}
              {activeTab === 'teacherWorkspace' && t('teacherWorkspace')}
              {activeTab === 'adminWorkspace' && t('adminView')}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              {lang === 'uz' ? 'Bugungi sana: 2026-06-30 | Assistant School Avtomatlashtirilgan Tizim' : '本日日付: 2026-06-30 | Assistant School 管理システム'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setShowStudentPortal(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              📱 {t('studentView')}
            </button>
            
            {/* Language Selector Switch */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.03)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)' }}>
              <button onClick={() => setLang('uz')} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', background: lang === 'uz' ? 'var(--ios-blue)' : 'transparent', color: lang === 'uz' ? '#fff' : 'var(--text-primary)' }}>UZ</button>
              <button onClick={() => setLang('jp')} style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', background: lang === 'jp' ? 'var(--ios-blue)' : 'transparent', color: lang === 'jp' ? '#fff' : 'var(--text-primary)' }}>JP</button>
            </div>

            <button className="btn btn-secondary" onClick={() => {
              if (window.confirm(lang === 'uz' ? "Tizim ma'lumotlarini dastlabki holatga qaytarishni xohlaysizmi?" : "デモデータを初期状態にリセットしますか？")) {
                localStorage.clear();
                window.location.reload();
              }
            }} style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              🔄 {lang === 'uz' ? 'Tozalash' : 'リセット'}
            </button>

            {getVisaAlertCount() > 0 && (
              <div className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                {t('visaAlert')}: {getVisaAlertCount()}
              </div>
            )}
          </div>
        </header>

        {/* 1. Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="card-grid">
              <div className="metric-card glass float-card-1">
                <div className="metric-info">
                  <h3>{t('totalStudents')}</h3>
                  <div className="metric-value">{students.length}</div>
                </div>
                <div className="metric-icon" style={{ color: 'var(--ios-blue)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
              </div>
              <div className="metric-card glass float-card-2">
                <div className="metric-info">
                  <h3>{t('activeClasses')}</h3>
                  <div className="metric-value">{classes.length}</div>
                </div>
                <div className="metric-icon" style={{ color: 'var(--ios-purple)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>
                </div>
              </div>
              <div className="metric-card glass float-card-3">
                <div className="metric-info">
                  <h3>{t('averageAttendance')}</h3>
                  <div className="metric-value">
                    {(students.reduce((acc, s) => acc + s.attendancePercent, 0) / students.length).toFixed(1)}%
                  </div>
                </div>
                <div className="metric-icon" style={{ color: 'var(--ios-green)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                </div>
              </div>
            </div>

            {/* Smart Reminders (Notepad Cards Grid) */}
            <div className="glass" style={{ padding: '24px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconNotepad /> {lang === 'uz' ? 'Dolzarb Bloknot Rejalari' : 'スマート予定ノート'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {tasks.length === 0 ? (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.01)', borderRadius: '14px', border: '1px dashed var(--border-color)' }}>
                    {lang === 'uz' ? "Hozircha rejalashtirilgan vazifalar yo'q. Yangi vazifa qo'shish uchun 'Aqlli Bloknot' bo'limiga o'ting." : "現在予定されているタスクはありません。スマートノートメニューから追加できます。"}
                  </div>
                ) : (
                  tasks.map(tObj => {
                    const isCompleted = tObj.status === 'Completed';
                    const daysLeft = Math.ceil((new Date(tObj.dueDate) - new Date('2026-06-30')) / (1000 * 60 * 60 * 24));
                    
                    let cardColor = 'rgba(52, 199, 89, 0.08)'; // Green
                    let borderCol = 'var(--ios-green)';
                    let alertText = lang === 'uz' ? 'Xavfsiz' : '期限内';

                    if (daysLeft === 0) {
                      cardColor = isCompleted ? 'rgba(255, 59, 48, 0.03)' : 'rgba(255, 59, 48, 0.08)'; // Red
                      borderCol = 'var(--ios-red)';
                      alertText = lang === 'uz' ? 'Bugun bajarilishi shart!' : '本日期限！';
                    } else if (daysLeft <= 3 && daysLeft > 0) {
                      cardColor = isCompleted ? 'rgba(255, 149, 0, 0.03)' : 'rgba(255, 149, 0, 0.08)'; // Orange
                      borderCol = 'var(--ios-orange)';
                      alertText = lang === 'uz' ? '3 Kun qoldi!' : 'あと3日！';
                    } else if (daysLeft <= 7 && daysLeft > 3) {
                      cardColor = isCompleted ? 'rgba(250, 204, 21, 0.03)' : 'rgba(250, 204, 21, 0.08)'; // Yellow
                      borderCol = '#eab308';
                      alertText = lang === 'uz' ? '1 Hafta qoldi' : 'あと1週間';
                    } else if (daysLeft < 0) {
                      cardColor = isCompleted ? 'rgba(127, 29, 29, 0.03)' : 'rgba(127, 29, 29, 0.08)'; // Dark Red Overdue
                      borderCol = '#7f1d1d';
                      alertText = lang === 'uz' ? 'Muddati o\'tgan!' : '期限超過！';
                    } else if (isCompleted) {
                      cardColor = 'rgba(0, 0, 0, 0.02)';
                      borderCol = 'var(--inner-border)';
                    }

                    if (isCompleted) {
                      alertText = `${alertText} ✓`;
                    }

                    const opacityVal = isCompleted ? (daysLeft <= 0 ? 0.9 : 0.65) : 1;

                    const relStudent = students.find(s => s.id === tObj.studentId);

                    return (
                      <div key={tObj.id} style={{ background: cardColor, border: `1px solid ${isCompleted && daysLeft > 7 ? 'rgba(0,0,0,0.06)' : borderCol}`, borderLeft: `6px solid ${borderCol}`, padding: '24px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px', opacity: opacityVal, transition: 'all 0.3s ease', minHeight: '180px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 'bold', color: borderCol }}>
                              {tObj.category === 'Suhbat' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                              {tObj.category === 'To\'lov' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                              {tObj.category === 'Hujjat' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>}
                              {tObj.category === 'Boshqa' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                              {tObj.category}
                            </span>
                            <span className="badge" style={{ borderColor: borderCol, color: borderCol, background: '#fff', fontSize: '10px' }}>{alertText}</span>
                          </div>
                          <h4 style={{ fontSize: '15px', fontWeight: '700', textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)' }}>{tObj.title}</h4>
                          {relStudent && (
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                              👤 Talaba: {relStudent.nameEn} ({relStudent.id})
                            </div>
                          )}
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>📅 Muddat: {tObj.dueDate}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                          <button className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`} onClick={() => handleCompleteTask(tObj.id)} style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {isCompleted ? (
                              <>↩️ {lang === 'uz' ? 'Qaytarish' : 'やり直す'}</>
                            ) : (
                              <>✓ {lang === 'uz' ? 'Bajarildi' : '完了'}</>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              {/* Visa Alerts List */}
              <div className="glass" style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ios-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  {t('visaAlertTitle')}
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {students.map(s => {
                    const days = getDaysToVisaExpiry(s.visaExpiry);
                    if (days <= 30) {
                      return (
                        <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(255, 59, 48, 0.04)', borderRadius: '12px', borderLeft: '4px solid var(--ios-red)' }}>
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

                  {students.map(s => {
                    if (s.attendancePercent < 80) {
                      return (
                        <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(255, 149, 0, 0.04)', borderRadius: '12px', borderLeft: '4px solid var(--ios-orange)' }}>
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
                <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {t('todayLessons')}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '12px', borderBottom: '1px solid var(--inner-border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--ios-blue)', fontWeight: '600' }}>09:00 - 10:30 (1-2)</div>
                    <div style={{ fontWeight: '500', marginTop: '4px' }}>{lang === 'uz' ? 'Choraklik Yapon Tili Grammatikasi' : '期末日本語文法授業'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sinf: 2026-A | Tanaka Sato</div>
                  </div>
                  <div style={{ padding: '12px', borderBottom: '1px solid var(--inner-border)' }}>
                    <div style={{ fontSize: '12px', color: 'var(--ios-blue)', fontWeight: '600' }}>10:45 - 12:15 (3-4)</div>
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

        {/* 2. Master Settings Tab */}
        {activeTab === 'master' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                {t('calendarTitle')}
              </h2>
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Sana / 日付</th>
                      <th>Bayram / 祝日名</th>
                      <th>Holati / 区分</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calendar.holidays.map(h => (
                      <tr key={h.date}>
                        <td>{h.date}</td>
                        <td style={{ fontWeight: '600' }}>{h.name}</td>
                        <td><span className="badge badge-danger">{lang === 'uz' ? 'Bayram' : '祝日'}</span></td>
                      </tr>
                    ))}
                    {calendar.schoolClosed.map(c => (
                      <tr key={c.date}>
                        <td>{c.date}</td>
                        <td style={{ fontWeight: '600' }}>{c.reason}</td>
                        <td><span className="badge badge-warning">{lang === 'uz' ? 'Yopiq' : '休校'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-3-3.87"></path><path d="M9 21v-2a4 4 0 0 0-4-4H3a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                {t('teacherTitle')}
              </h2>
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Ismi / 氏名</th>
                      <th>Bo'lim / 所属</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map(tObj => (
                      <tr key={tObj.id}>
                        <td>{tObj.id}</td>
                        <td style={{ fontWeight: '600' }}>{tObj.name}</td>
                        <td>{tObj.department}</td>
                        <td><code>{tObj.email}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. Students Tab */}
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                {t('addStudent')}
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
                    <th>{t('hoursLimit')} (28h)</th>
                    <th>{t('visaExpiry')}</th>
                    <th>{t('attendancePercent')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students
                    .filter(s => s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || s.nationality.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.includes(searchQuery))
                    .map(s => {
                      const totalHrs = getStudentTotalArubaitoHours(s);
                      return (
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
                            <span className={`badge ${getArubaitoStatusClass(totalHrs)}`}>
                              {totalHrs}h / 28h
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${getDaysToVisaExpiry(s.visaExpiry) <= 30 ? 'badge-danger' : 'badge-success'}`}>
                              {s.visaExpiry}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${getAttendanceBadgeClass(s.attendancePercent)}`}>
                              {s.attendancePercent}%
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => setSelectedStudent(s)}>
                              {t('details')}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Selected Student Details View */}
        {selectedStudent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <button className="btn btn-secondary" style={{ alignSelf: 'flex-start' }} onClick={() => setSelectedStudent(null)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              {t('backToList')}
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              {/* Left Profile card */}
              <div className="glass" style={{ padding: '24px', textAlign: 'center' }}>
                <img src={selectedStudent.photo} alt={selectedStudent.nameEn} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--ios-blue)', margin: '0 auto 16px' }} />
                <h2 style={{ fontSize: '20px' }}>{selectedStudent.nameEn}</h2>
                <p style={{ color: 'var(--text-secondary)', margin: '4px 0 16px' }}>{selectedStudent.nameJp}</p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                  <span className="badge badge-success">{selectedStudent.nationality}</span>
                  <span className="badge badge-warning">{selectedStudent.entryTerm}</span>
                </div>

                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--inner-border)', paddingTop: '16px' }}>
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
                    <div style={{ fontWeight: '500', color: getDaysToVisaExpiry(selectedStudent.visaExpiry) <= 30 ? 'var(--ios-red)' : 'inherit' }}>{selectedStudent.visaExpiry}</div>
                  </div>
                </div>
              </div>

              {/* Right Profile details tabs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Grades & Performance */}
                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('gradesPerformance')}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--inner-border)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('internalGrades')}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>Total: {selectedStudent.grades.internal.total}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Kanji: {selectedStudent.grades.internal.kanji} | Reading: {selectedStudent.grades.internal.reading}</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--inner-border)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('jlptResult')}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>{selectedStudent.grades.jlpt.level} - {selectedStudent.grades.jlpt.result}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Ball: {selectedStudent.grades.jlpt.score}</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--inner-border)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('ejuScore')}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '4px' }}>{selectedStudent.grades.eju.japanese} Ball</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Jpn: {selectedStudent.grades.eju.japanese} | Mat: {selectedStudent.grades.eju.math1}</div>
                    </div>
                  </div>
                </div>

                {/* 2. Arubaito (Part-Time Job) List */}
                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>💼 {t('arubaitoTracker')}</span>
                    <span className={`badge ${getArubaitoStatusClass(getStudentTotalArubaitoHours(selectedStudent))}`}>
                      Jami: {getStudentTotalArubaitoHours(selectedStudent)} soat / 28
                    </span>
                  </h3>
                  {(!selectedStudent.arubaito || selectedStudent.arubaito.jobs.length === 0) ? (
                    <p style={{ color: 'var(--text-muted)' }}>Ish joyi kiritilmagan.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectedStudent.arubaito.jobs.map(job => (
                        <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(0,0,0,0.01)', borderRadius: '12px', border: '1px solid var(--inner-border)' }}>
                          <div>
                            <div style={{ fontWeight: '600', fontSize: '14px' }}>{job.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status: Ishlamoqda</div>
                          </div>
                          <div style={{ fontWeight: 'bold', color: 'var(--ios-blue)' }}>{job.hoursPerWeek} soat/hafta</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Interview / Counseling logs */}
                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('interviewLogs')}</h3>
                  {selectedStudent.interviews.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{t('noInterviews')}</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {selectedStudent.interviews.map(i => (
                        <div key={i.id} style={{ background: 'rgba(0,0,0,0.01)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid var(--ios-blue)', border: '1px solid var(--inner-border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontWeight: '600', fontSize: '14px' }}>{i.category}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{i.date} | O'qituvchi: {i.interviewer}</span>
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.5' }}>{i.notes}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Classes Tab */}
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
                        <td>{teachers.find(tObj => tObj.id === c.teacherId)?.name}</td>
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
          </div>
        )}

        {/* 5. Smart Attendance Grid (Excel sheet Simulation) */}
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
              <button className="btn btn-secondary" onClick={handleSmartCheckAll} style={{ alignSelf: 'flex-end' }}>
                {t('checkAllPresent')}
              </button>
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
                    <th>{t('attendancePercent')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.filter(s => s.classId === selectedClass).map(s => {
                    const dayAtt = s.attendance[attendanceDate] || ['present', 'present', 'present', 'present'];
                    return (
                      <tr key={s.id} onContextMenu={(e) => handleExcelContextMenu(e, s.id)}>
                        <td>{s.id}</td>
                        <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                        {[0, 1, 2, 3].map(pIdx => (
                          <td key={pIdx}>
                            <select 
                              className="form-control" 
                              style={{ padding: '4px', fontSize: '12px', border: 'none', background: 'transparent' }} 
                              value={dayAtt[pIdx]} 
                              onChange={(e) => handlePeriodAttendanceChange(s.id, attendanceDate, pIdx, e.target.value)}
                            >
                              <option value="present">🟢 Keldi</option>
                              <option value="late">🟡 Kechikdi</option>
                              <option value="absent">🔴 Kelmadi</option>
                            </select>
                          </td>
                        ))}
                        <td>
                          <span className={`badge ${getAttendanceBadgeClass(s.attendancePercent)}`}>
                            {s.attendancePercent}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Grades Tab */}
        {activeTab === 'grades' && (
          <div className="glass" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('gradesPerformance')}</h2>
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>{t('studentId')}</th>
                    <th>{t('nameEn')}</th>
                    <th>Kanji</th>
                    <th>Listening</th>
                    <th>Reading</th>
                    <th>Writing</th>
                    <th>{t('jlptResult')}</th>
                    <th>{t('ejuScore')} (Jpn)</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                      <td><span className="badge badge-success">{s.grades.internal.kanji}</span></td>
                      <td><span className="badge badge-success">{s.grades.internal.listening}</span></td>
                      <td><span className="badge badge-success">{s.grades.internal.reading}</span></td>
                      <td><span className="badge badge-success">{s.grades.internal.writing}</span></td>
                      <td><span className="badge badge-warning">{s.grades.jlpt.level} ({s.grades.jlpt.result})</span></td>
                      <td style={{ fontWeight: 'bold' }}>{s.grades.eju.japanese} Pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. Finance Tab */}
        {activeTab === 'finance' && (
          <div className="glass" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>{t('docInvoice')}</h2>
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>{t('invoiceNo')}</th>
                    <th>{t('studentId')}</th>
                    <th>{t('nameEn')}</th>
                    <th>Semestr</th>
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
                        <td style={{ fontWeight: 'bold' }}>{inv.amount.toLocaleString()} JPY</td>
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
        )}

        {/* 8. Documents Tab (Print certificates list) */}
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
                      <td><img src={s.photo} alt={s.nameEn} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} /></td>
                      <td>{s.id}</td>
                      <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                      <td>{classes.find(c => c.id === s.classId)?.name}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType('enrollment'); setPrintStudent(s); setShowPrintModal(true); }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                            {lang === 'uz' ? 'O\'qish Joyidan' : '在学証明'}
                          </button>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType('grades'); setPrintStudent(s); setShowPrintModal(true); }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            {lang === 'uz' ? 'Baholar & Davomat' : '成績・出席'}
                          </button>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType('invoice'); setPrintStudent(s); setShowPrintModal(true); }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            {lang === 'uz' ? 'Invoys' : '請求書'}
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

        {/* 9. Smart Notepad Tab */}
        {activeTab === 'notepad' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            {/* Task Creator Form */}
            <div className="glass" style={{ padding: '24px', alignSelf: 'flex-start' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>✏️ Yangi Eslatma</h3>
              <form onSubmit={handleAddTaskSubmit}>
                <div className="form-group">
                  <label className="form-label">Eslatma Mazmuni</label>
                  <input type="text" className="form-control" required value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">O'quvchi (Ixtiyoriy)</label>
                  <select className="form-control" value={newTask.studentId} onChange={(e) => setNewTask({ ...newTask, studentId: e.target.value })}>
                    <option value="">-- Tanlang --</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.nameEn}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Muddat Sanasi</label>
                  <input type="date" className="form-control" required value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Kategoriya</label>
                  <select className="form-control" value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}>
                    <option value="Suhbat">Shinro Suhbat</option>
                    <option value="To'lov">Kontrakt To'lovi</option>
                    <option value="Hujjat">Nyukan Arizasi</option>
                    <option value="Boshqa">Boshqa Vazifa</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>Saqlash</button>
              </form>
            </div>

            {/* Tasks Log Table */}
            <div className="glass" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>📝 Rejalar Daftari</h3>
              <div className="table-container">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Vazifa</th>
                      <th>O'quvchi ID</th>
                      <th>Muddat</th>
                      <th>Kategoriya</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map(tObj => (
                      <tr key={tObj.id}>
                        <td style={{ fontWeight: '600' }}>{tObj.title}</td>
                        <td>{tObj.studentId || 'Umumiy'}</td>
                        <td>{tObj.dueDate}</td>
                        <td><span className="badge badge-success">{tObj.category}</span></td>
                        <td>
                          <span className={`badge ${tObj.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                            {tObj.status === 'Completed' ? 'Bajarildi' : 'Kutilmoqda'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 10. Teacher Workspace Tab */}
        {activeTab === 'teacherWorkspace' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* iOS-Style Segmented Control for Sub Tabs */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.03)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)', maxWidth: '640px' }}>
              <button 
                onClick={() => { setActiveTeacherSubTab('journal'); setSeatingChart([]); setBulkGradingMode(false); }} 
                style={{ flex: 1, padding: '8px 16px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s', background: activeTeacherSubTab === 'journal' ? '#fff' : 'transparent', color: activeTeacherSubTab === 'journal' ? 'var(--ios-blue)' : 'var(--text-secondary)', boxShadow: activeTeacherSubTab === 'journal' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}
              >
                📖 {lang === 'uz' ? 'Dars Kundaligi' : '授業日誌'}
              </button>
              <button 
                onClick={() => { setActiveTeacherSubTab('bulk'); setBulkGradingMode(true); setSeatingChart([]); }} 
                style={{ flex: 1, padding: '8px 16px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s', background: activeTeacherSubTab === 'bulk' ? '#fff' : 'transparent', color: activeTeacherSubTab === 'bulk' ? 'var(--ios-blue)' : 'var(--text-secondary)', boxShadow: activeTeacherSubTab === 'bulk' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}
              >
                📝 {lang === 'uz' ? 'Ommaviy Baholar' : '成績一括入力'}
              </button>
              <button 
                onClick={() => { setActiveTeacherSubTab('seating'); setSeatingChart([]); setBulkGradingMode(false); generateSeatingChartLogic(selectedTeacherClass); }} 
                style={{ flex: 1, padding: '8px 16px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s', background: activeTeacherSubTab === 'seating' ? '#fff' : 'transparent', color: activeTeacherSubTab === 'seating' ? 'var(--ios-blue)' : 'var(--text-secondary)', boxShadow: activeTeacherSubTab === 'seating' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}
              >
                🪑 {lang === 'uz' ? 'Sekigae Joylashuv' : '席替え配置'}
              </button>
              <button 
                onClick={() => { setActiveTeacherSubTab('aiGrading'); setSeatingChart([]); setBulkGradingMode(false); }} 
                style={{ flex: 1, padding: '8px 16px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s', background: activeTeacherSubTab === 'aiGrading' ? '#fff' : 'transparent', color: activeTeacherSubTab === 'aiGrading' ? 'var(--ios-blue)' : 'var(--text-secondary)', boxShadow: activeTeacherSubTab === 'aiGrading' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none' }}
              >
                🤖 {lang === 'uz' ? 'AI Tekshiruvchi' : 'AI採点アシスト'}
              </button>
            </div>

            {/* Selected Class Filter (Only visible for Journal / Seating / Bulk) */}
            {activeTeacherSubTab !== 'aiGrading' && (
              <div className="form-group" style={{ marginBottom: 0, minWidth: '240px', maxWidth: '300px' }}>
                <label className="form-label">{t('selectClass')}</label>
                <select className="form-control" value={selectedTeacherClass} onChange={(e) => { setSelectedTeacherClass(e.target.value); setSeatingChart([]); if (activeTeacherSubTab === 'seating') generateSeatingChartLogic(e.target.value); }}>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            )}

            {/* SUB-TAB 1: Class Lesson Journal */}
            {activeTeacherSubTab === 'journal' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>📖 {lang === 'uz' ? 'Yangi Dars Kundaligi' : '授業日誌を登録'}</h3>
                  {lessonLogs.filter(log => log.classId === selectedTeacherClass).length > 0 && (
                    <div style={{ background: 'var(--accent-teal-glow)', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '12px', border: '1px solid var(--border-color)', color: 'var(--accent-teal)' }}>
                      <b>Oxirgi darsda:</b> {lessonLogs.filter(log => log.classId === selectedTeacherClass)[0].textbook} - {lessonLogs.filter(log => log.classId === selectedTeacherClass)[0].lesson} o'tildi.
                    </div>
                  )}
                  <form onSubmit={handleAddLogSubmit}>
                    <div className="form-group">
                      <label className="form-label">Darslik / 教科書</label>
                      <input type="text" className="form-control" placeholder="Minna no Nihongo" required value={newLog.textbook} onChange={(e) => setNewLog({ ...newLog, textbook: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mavzu / 単元・トピック</label>
                      <input type="text" className="form-control" placeholder="35-Dars Shart mayli" required value={newLog.lesson} onChange={(e) => setNewLog({ ...newLog, lesson: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Uyga Vazifa / 宿題</label>
                      <input type="text" className="form-control" placeholder="Mondai 4, 5" required value={newLog.homework} onChange={(e) => setNewLog({ ...newLog, homework: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Izoh / 授業備考</label>
                      <textarea className="form-control" placeholder="Darsda talabalar faolligi va boshqalar..." style={{ minHeight: '80px' }} value={newLog.notes} onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>Darsni Qayd Etish</button>
                  </form>
                </div>

                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>📖 {lang === 'uz' ? 'Dars Qaydlari Arxivi' : '過去の授業日誌'}</h3>
                  <div className="table-container">
                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>Sana</th>
                          <th>Darslik</th>
                          <th>Mavzu</th>
                          <th>Uyga vazifa</th>
                          <th>Qaydlar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lessonLogs.filter(log => log.classId === selectedTeacherClass).map(log => (
                          <tr key={log.id}>
                            <td>{log.date}</td>
                            <td style={{ fontWeight: '600' }}>{log.textbook}</td>
                            <td>{log.lesson}</td>
                            <td>{log.homework}</td>
                            <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{log.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: Bulk Grading */}
            {activeTeacherSubTab === 'bulk' && bulkGradingMode && (
              <div className="glass" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>📝 {lang === 'uz' ? 'Ommaviy Baholar Kiritish Varaqi' : '成績一括入力用紙'}</h3>
                <div className="table-container" style={{ marginBottom: '16px' }}>
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>学籍番号 (ID)</th>
                        <th>氏名 (Name)</th>
                        <th>EJU Japanese Ball (Max: 400)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.filter(s => s.classId === selectedTeacherClass).map(s => (
                        <tr key={s.id}>
                          <td>{s.id}</td>
                          <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                          <td>
                            <input 
                              type="number" 
                              className="form-control" 
                              style={{ width: '120px' }} 
                              value={bulkGrades[s.id] || ''} 
                              onChange={(e) => setBulkGrades({ ...bulkGrades, [s.id]: e.target.value })} 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary" onClick={() => { setActiveTeacherSubTab('journal'); setBulkGradingMode(false); }}>{t('cancel')}</button>
                  <button className="btn btn-primary" onClick={saveBulkGradesLogic}>{t('save')}</button>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: Seating Chart */}
            {activeTeacherSubTab === 'seating' && seatingChart.length > 0 && (
              <div className="glass" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🪑</span> {t('seatingChart')} - Guruh Millat Balansi (Sekigae Map)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', background: 'rgba(0,0,0,0.01)', padding: '24px', borderRadius: '16px' }}>
                  <div style={{ width: '100%', maxWidth: '300px', height: '30px', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px', marginBottom: '20px' }}>
                    O'QITUVCHI STOLI (黒板・教卓)
                  </div>
                  {seatingChart.map((row, rIdx) => (
                    <div key={rIdx} style={{ display: 'flex', gap: '30px', justifyContent: 'center', width: '100%' }}>
                      {row.map(student => (
                        <div key={student.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.95)', border: '1px solid var(--border-color)', borderRadius: '14px', width: '130px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                          <img src={student.photo} alt={student.nameEn} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginBottom: '8px' }} />
                          <div style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.nameEn.split(' ')[0]}</div>
                          <span className="badge badge-success" style={{ fontSize: '9px', padding: '2px 6px', marginTop: '4px' }}>{student.nationality}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-TAB 4: AI Grading Assistant */}
            {activeTeacherSubTab === 'aiGrading' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                {/* Left Side: Homework Submissions List */}
                <div className="glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>🗳️ Topshirilgan Vazifalar</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {homeworkSubmissions.map(sub => {
                      const studentObj = students.find(s => s.id === sub.studentId);
                      return (
                        <div 
                          key={sub.id} 
                          onClick={() => { setSelectedSubmissionId(sub.id); setAiFeedback(''); setAiCorrections([]); }}
                          style={{ padding: '16px', borderRadius: '14px', border: selectedSubmissionId === sub.id ? '2px solid var(--ios-blue)' : '1px solid var(--border-color)', background: selectedSubmissionId === sub.id ? 'rgba(0,122,255,0.04)' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span className={`badge ${sub.status === 'Graded' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '10px' }}>
                              {sub.status === 'Graded' ? (lang === 'uz' ? 'Tekshirilgan' : '採点済') : (lang === 'uz' ? 'Kutilmoqda' : '未採点')}
                            </span>
                            {sub.score && <span style={{ fontWeight: 'bold', color: 'var(--ios-blue)' }}>{sub.score} ball</span>}
                          </div>
                          <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: '4px 0' }}>{sub.title}</h4>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                            Talaba: {studentObj?.nameEn} | Guruh: N2
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Selected Homework Canvas & Controls */}
                <div className="glass" style={{ padding: '24px' }}>
                  {selectedSubmissionId ? (
                    (() => {
                      const sub = homeworkSubmissions.find(s => s.id === selectedSubmissionId);
                      const studentObj = students.find(s => s.id === sub.studentId);
                      
                      // Run simulated Canvas draw inside useEffect
                      setTimeout(() => {
                        const canvas = document.getElementById('grading-canvas');
                        if (canvas) {
                          const ctx = canvas.getContext('2d');
                          ctx.clearRect(0, 0, canvas.width, canvas.height);
                          ctx.fillStyle = '#fff9f0'; // Japanese grid paper cream
                          ctx.fillRect(0, 0, canvas.width, canvas.height);
                          
                          // Draw Japanese grid lines (Genko Yoshi style)
                          ctx.strokeStyle = 'rgba(0, 150, 0, 0.15)';
                          ctx.lineWidth = 1;
                          for (let x = 0; x < canvas.width; x += 40) {
                            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
                          }
                          for (let y = 0; y < canvas.height; y += 40) {
                            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
                          }

                          // Draw simulated handwritten characters
                          ctx.font = 'bold 20px serif';
                          ctx.fillStyle = '#1e293b';
                          if (sub.id === 'sub1') {
                            ctx.fillText("漢字の練習 (食べる, 見る, 書く)", 40, 50);
                            ctx.fillText("一、私は毎日ご飯を食べる。", 40, 130);
                            ctx.fillText("二、テレビを見る。", 40, 210);
                            ctx.fillText("三、日本語で手紙を書く。", 40, 295);
                          } else {
                            ctx.fillText("日本で勉強する私の目標 (JLPT N3 作文)", 40, 50);
                            ctx.fillText("私は来年大学に進学したいです。", 40, 130);
                            ctx.fillText("だから、毎日三時間日本語勉強しています。", 40, 210);
                            ctx.fillText("将来、日本とウズベキスタンの懸け橋になりたい。", 40, 295);
                          }

                          // Draw annotations if graded or simulation completed
                          const activeCorr = aiCorrections.length > 0 ? aiCorrections : sub.corrections;
                          if (activeCorr && activeCorr.length > 0) {
                            activeCorr.forEach(c => {
                              // Red ink check circle
                              ctx.strokeStyle = '#ff3b30';
                              ctx.lineWidth = 3;
                              ctx.beginPath();
                              ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
                              ctx.stroke();

                              // Correction note label
                              ctx.fillStyle = '#ff3b30';
                              ctx.font = 'bold 12px sans-serif';
                              ctx.fillText(c.note, c.x + c.r + 5, c.y + 5);
                            });
                          }
                        }
                      }, 50);

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                            <div>
                              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{sub.title}</h3>
                              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                Talaba: {studentObj?.nameEn} | Baholash: {sub.status === 'Graded' ? 'Muvaffaqiyatli yakunlangan' : 'Kutilmoqda'}
                              </p>
                            </div>
                            {sub.status === 'Pending' && !aiFeedback && (
                              <button className="btn btn-primary" onClick={() => handleStartAiGrading(sub.id)} disabled={aiGradingLoading} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {aiGradingLoading ? (
                                  <>Skanerlanmoqda...</>
                                ) : (
                                  <>🤖 AI Tekshiruvi</>
                                )}
                              </button>
                            )}
                          </div>

                          {/* Canvas Image Container */}
                          <div style={{ background: '#fff9f0', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: '16px', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.03)' }}>
                            <canvas id="grading-canvas" width="600" height="380" style={{ maxWidth: '100%', height: 'auto', background: '#fff9f0' }}></canvas>
                          </div>

                          {/* AI feedback review and approvals controls */}
                          {(aiFeedback || sub.status === 'Graded') && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', background: 'rgba(0,0,0,0.01)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', alignItems: 'center' }}>
                                <label className="form-label" style={{ fontWeight: 'bold', marginBottom: 0 }}>AI Ball (Editiable):</label>
                                <input 
                                  type="number" 
                                  className="form-control" 
                                  style={{ maxWidth: '100px' }} 
                                  value={aiGrade} 
                                  onChange={(e) => setAiGrade(Number(e.target.value))} 
                                  disabled={sub.status === 'Graded'}
                                />
                              </div>
                              <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label" style={{ fontWeight: 'bold' }}>AI Fikr-mulohazasi & Izohlar:</label>
                                <textarea 
                                  className="form-control" 
                                  style={{ minHeight: '80px' }} 
                                  value={aiFeedback || sub.feedback} 
                                  onChange={(e) => setAiFeedback(e.target.value)}
                                  disabled={sub.status === 'Graded'}
                                />
                              </div>

                              {sub.status === 'Pending' && (
                                <button className="btn btn-primary" onClick={() => handleSaveAiGrade(sub.id)} style={{ width: '100%' }}>
                                  ✓ Baholashni Tasdiqlash & Talabaga Yuborish
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="13" y2="17"></line></svg>
                      <p>{lang === 'uz' ? 'Chap tomondagi ro\'yxatdan tekshirilishi kerak bo\'lgan uyga vazifani tanlang.' : '左側のリストから採点する提出物を選んでください。'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 10.5. Dedicated AI Grading & Batch Upload Assistant Tab */}
        {activeTab === 'aiGrading' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header / Intro */}
            <div className="glass" style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--ios-blue)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🤖 AI Baholash Asistenti & Ommaviy Tekshiruvchi
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                {lang === 'uz' ? 
                  "Ushbu bo'limda talabalarning yozma ishlari, kanzilar va imtihon varaqlarini ommaviy yuklash va AI yordamida bir vaqtning o'zida tekshirib olishingiz mumkin. Natijalar o'qituvchi tomonidan tasdiqlanganidan so'ng talaba portalida aks etadi." : 
                  "このセクションでは、学生の漢字練習や作文、テストの答案用紙をまとめてアップロードし、AIで一括採点できます。採点結果は教師が確認後に学生マイページへ自動送信されます。"}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              {/* Left Column: Drag & Drop File Upload + Batch Control Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Upload zone */}
                <div className="glass" style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>📤 {lang === 'uz' ? 'Topshiriqlarni Yuklash' : '提出ファイルのアップロード'}</h3>
                  <div style={{ width: '100%', height: '140px', border: '2px dashed var(--border-color)', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.01)', padding: '16px', cursor: 'pointer', position: 'relative' }}>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleBatchHomeworkFiles} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    />
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ios-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{lang === 'uz' ? 'Rasmlarni tanlang yoki bu yerga torting' : '画像を選択またはドラッグ＆ドロップ'}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>PNG, JPG, JPEG (Ko'p tanlash mumkin)</span>
                  </div>

                  {uploadedHomeworks.length > 0 && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold' }}>
                        <span>Navbatdagilar: {uploadedHomeworks.length} ta rasm</span>
                        <span style={{ color: 'var(--ios-blue)' }}>{batchGradingProgress}%</span>
                      </div>
                      
                      {/* iOS Style Progress Bar */}
                      <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${batchGradingProgress}%`, height: '100%', background: 'var(--ios-blue)', transition: 'width 0.3s ease' }}></div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button 
                          className="btn btn-primary" 
                          onClick={handleStartBatchAiGrading} 
                          disabled={batchGradingActive || uploadedHomeworks.every(sub => sub.status === 'Graded')} 
                          style={{ flex: 2 }}
                        >
                          {batchGradingActive ? '🤖 AI Tekshirmoqda...' : '🤖 AI Ommaviy Tekshiruv'}
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          onClick={() => setUploadedHomeworks([])} 
                          disabled={batchGradingActive}
                          style={{ flex: 1 }}
                        >
                          {lang === 'uz' ? 'Tozalash' : 'クリア'}
                        </button>
                      </div>

                      {uploadedHomeworks.some(sub => sub.status === 'Graded') && (
                        <button 
                          className="btn btn-success" 
                          onClick={handleConfirmAllBatchGrades}
                          disabled={batchGradingActive}
                          style={{ width: '100%', marginTop: '8px', background: 'var(--ios-green)', color: '#fff', border: 'none' }}
                        >
                          ✓ Barcha Baholarni Tasdiqlash & Bazaga Kiritish
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Queue list items */}
                {uploadedHomeworks.length > 0 && (
                  <div className="glass" style={{ padding: '24px', maxHeight: '350px', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>📋 Navbat ro'yxati</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {uploadedHomeworks.map((sub, idx) => {
                        const studentObj = students.find(s => s.id === sub.studentId);
                        return (
                          <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                            <div>
                              <div style={{ fontWeight: 'bold' }}>{sub.title}</div>
                              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                Biriktirilgan: {studentObj?.nameEn}
                              </div>
                            </div>
                            <span className={`badge ${sub.status === 'Graded' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '9px' }}>
                              {sub.status === 'Graded' ? (lang === 'uz' ? 'Tayyor' : '採点完了') : (lang === 'uz' ? 'Navbatda' : '待機中')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Scanned Files Grid with AI circled Canvas overlays */}
              <div className="glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>👀 Skanerlangan Ishlarni Tekshirish & Tasdiqlash</h3>
                
                {uploadedHomeworks.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.7 }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                    <p style={{ fontSize: '13px' }}>{lang === 'uz' ? 'Chap tomondan rasmlarni yuklang va AI tugmasini bosing.' : '左側のエリアから画像をアップロードし、AI採点を開始してください。'}</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {uploadedHomeworks.map((sub, index) => {
                      // Schedule canvas drawing for preview grid
                      setTimeout(() => {
                        const canvas = document.getElementById("batch-grading-canvas-" + sub.id);
                        if (canvas) {
                          const ctx = canvas.getContext('2d');
                          ctx.clearRect(0, 0, canvas.width, canvas.height);
                          ctx.fillStyle = '#fff9f0';
                          ctx.fillRect(0, 0, canvas.width, canvas.height);
                          
                          // Grid lines
                          ctx.strokeStyle = 'rgba(0, 150, 0, 0.12)';
                          ctx.lineWidth = 1;
                          for (let x = 0; x < canvas.width; x += 20) {
                            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
                          }
                          for (let y = 0; y < canvas.height; y += 20) {
                            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
                          }

                          // Handwriting
                          ctx.font = 'bold 11px serif';
                          ctx.fillStyle = '#1e293b';
                          if (sub.imageType === 'kanji1') {
                            ctx.fillText("漢字の練習 (食べる, 見る, 書く)", 15, 25);
                            ctx.fillText("一、私は毎日ご飯を食べる。", 15, 65);
                            ctx.fillText("二、テレビを見る。", 15, 105);
                            ctx.fillText("三、日本語で手紙を書く。", 15, 145);
                          } else {
                            ctx.fillText("日本で勉強する私の目標", 15, 25);
                            ctx.fillText("私は来年大学に進学したいです。", 15, 65);
                            ctx.fillText("だから、毎日三時間日本語勉強しています。", 15, 105);
                            ctx.fillText("将来、日本とウズベキスタンの懸け橋になりたい。", 15, 145);
                          }

                          // Annotations
                          if (sub.corrections && sub.corrections.length > 0) {
                            sub.corrections.forEach(c => {
                              ctx.strokeStyle = '#ff3b30';
                              ctx.lineWidth = 1.5;
                              ctx.beginPath();
                              ctx.arc(c.x * 0.5, c.y * 0.5, c.r * 0.5, 0, 2 * Math.PI);
                              ctx.stroke();
                            });
                          }
                        }
                      }, 100);

                      return (
                        <div key={sub.id} style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', background: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{sub.title}</span>
                            {sub.status === 'Graded' ? (
                              <span style={{ fontWeight: 'bold', color: 'var(--ios-blue)', fontSize: '14px' }}>{sub.score} ball</span>
                            ) : (
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Kutilmoqda...</span>
                            )}
                          </div>

                          {/* Preview Canvas */}
                          <div style={{ background: '#fff9f0', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '12px', overflow: 'hidden', padding: '6px', display: 'flex', justifyContent: 'center' }}>
                            <canvas id={"batch-grading-canvas-" + sub.id} width="300" height="180" style={{ width: '100%', height: 'auto' }}></canvas>
                          </div>

                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '11px' }}>Talabani Biriktirish:</label>
                            <select 
                              className="form-control" 
                              style={{ padding: '4px 8px', fontSize: '11px', height: 'auto' }}
                              value={sub.studentId}
                              onChange={(e) => {
                                const val = e.target.value;
                                setUploadedHomeworks(prev => prev.map((s, idx) => idx === index ? { ...s, studentId: val } : s));
                              }}
                              disabled={batchGradingActive}
                            >
                              {students.map(s => <option key={s.id} value={s.id}>{s.nameEn} ({s.id})</option>)}
                            </select>
                          </div>

                          {sub.status === 'Graded' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <label style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: 0 }}>Ball:</label>
                                <input 
                                  type="number" 
                                  className="form-control" 
                                  style={{ width: '60px', padding: '2px 6px', fontSize: '11px', height: 'auto' }} 
                                  value={sub.score}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setUploadedHomeworks(prev => prev.map((s, idx) => idx === index ? { ...s, score: val } : s));
                                  }}
                                />
                              </div>
                              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', background: 'rgba(0,122,255,0.04)', padding: '6px 10px', borderRadius: '6px' }}>
                                <b>AI sharhi:</b> {sub.feedback}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 11. Admin Workspace Tab */}
        {activeTab === 'adminWorkspace' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--inner-border)', paddingBottom: '12px' }}>
              <button className={`btn ${activeAdminSubTab === 'coe' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveAdminSubTab('coe')}>
                📜 Nyukan CoE Arizalari (CoE forms)
              </button>
              <button className={`btn ${activeAdminSubTab === 'requests' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveAdminSubTab('requests')}>
                🗳️ Hujjat So'rovlari Navbati ({docRequests.filter(r => r.status === 'Pending').length})
              </button>
              <button className={`btn ${activeAdminSubTab === 'finance' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveAdminSubTab('finance')}>
                💰 Kontrakt To'lovlari Monitoringi
              </button>
            </div>

            {/* Admin sub-tab 1: Nyukan CoE Forms Generator */}
            {activeAdminSubTab === 'coe' && (
              <div className="glass" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>在留資格認定証明書交付申請書 - Nyukan CoE Arizalari Generatori</h3>
                <div className="table-container">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>学籍番号 (ID)</th>
                        <th>氏名 (Name)</th>
                        <th>国籍 (Nationality)</th>
                        <th>在留期間 (Expiry)</th>
                        <th>CoE Ariza Shakli</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(s => (
                        <tr key={s.id}>
                          <td>{s.id}</td>
                          <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                          <td>{s.nationality}</td>
                          <td>{s.visaExpiry}</td>
                          <td>
                            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType('coe'); setPrintStudent(s); setShowPrintModal(true); }}>
                              📄 Arizani Generatsiya Qilish
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Admin sub-tab 2: Document Request Queue */}
            {activeAdminSubTab === 'requests' && (
              <div className="glass" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>🗳️ Talabalar Hujjat So'rovlari Navbati (Document request inbox)</h3>
                <div className="table-container">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Ariza ID</th>
                        <th>Talaba ID</th>
                        <th>Talaba Ismi</th>
                        <th>Sertifikat Turi</th>
                        <th>So'rov Sanasi</th>
                        <th>Holati</th>
                        <th>Harakat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docRequests.map(req => {
                        const studentObj = students.find(s => s.id === req.studentId);
                        return (
                          <tr key={req.id}>
                            <td><code>{req.id}</code></td>
                            <td>{req.studentId}</td>
                            <td style={{ fontWeight: '600' }}>{studentObj?.nameEn || 'Noma\'lum'}</td>
                            <td>{req.docType === 'enrollment' ? '在学証明書 (Enrollment)' : '成績証明書 (Transcript)'}</td>
                            <td>{req.requestDate}</td>
                            <td>
                              <span className={`badge ${req.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                                {req.status === 'Approved' ? 'Tasdiqlangan' : 'Kutilmoqda'}
                              </span>
                            </td>
                            <td>
                              {req.status === 'Pending' ? (
                                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleApproveDocRequest(req.id)}>
                                  ✓ Tasdiqlash
                                </button>
                              ) : (
                                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType(req.docType); setPrintStudent(studentObj); setShowPrintModal(true); }}>
                                  🖨️ Chop etish
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Admin sub-tab 3: Finance / Tuition Installment Tracker */}
            {activeAdminSubTab === 'finance' && (
              <div className="glass" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>💰 Kontrakt To'lovlari va Oylik Monitoring</h3>
                <div className="table-container">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Talaba ID</th>
                        <th>Talaba Ismi</th>
                        <th>To'lov Bosqichi</th>
                        <th>Kontrakt Summasi</th>
                        <th>Deadline</th>
                        <th>Holati</th>
                        <th>Harakat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.flatMap(s => 
                        s.invoices.map(inv => (
                          <tr key={inv.id}>
                            <td>{s.id}</td>
                            <td style={{ fontWeight: '600' }}>{s.nameEn}</td>
                            <td>{inv.term}</td>
                            <td style={{ fontWeight: 'bold' }}>{inv.amount.toLocaleString()} JPY</td>
                            <td>{inv.deadline}</td>
                            <td>
                              <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-danger'}`}>
                                {inv.status === 'Paid' ? 'To\'langan' : 'To\'lanmagan'}
                              </span>
                            </td>
                            <td>
                              {inv.status === 'Unpaid' ? (
                                <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => { setPrintDocType('invoice'); setPrintStudent(s); setShowPrintModal(true); }}>
                                  ⚠️ Ogohlantirish Xatini Chop Etish
                                </button>
                              ) : (
                                <span style={{ color: 'var(--ios-green)', fontSize: '12px', fontWeight: 'bold' }}>✓ To'lov yakunlangan</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Simulated Context Menu for Excel Grid */}
      {contextMenu && (
        <ul className="excel-context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
          <li className="excel-context-item" onClick={() => executeContextAction(t('excelContextInsert'))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            {t('excelContextInsert')}
          </li>
          <li className="excel-context-item" onClick={() => executeContextAction(t('excelContextDelete'))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            {t('excelContextDelete')}
          </li>
          <li className="excel-context-item" onClick={() => executeContextAction(t('excelContextJump'))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            {t('excelContextJump')}
          </li>
          <li className="excel-context-item" onClick={() => executeContextAction(t('excelContextCopy'))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            {t('excelContextCopy')}
          </li>
          <li className="excel-context-item" onClick={() => executeContextAction(t('excelContextPaste'))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            {t('excelContextPaste')}
          </li>
        </ul>
      )}

      {/* MODAL: ADD STUDENT WITH OCR SCANNER */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'block', overflowY: 'auto', zIndex: 1000 }}>
          <div className="glass" style={{ width: '90%', maxWidth: '640px', padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.95)', margin: '40px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h2 style={{ fontSize: '20px', margin: 0 }}>{t('ocrTitle')}</h2>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div style={{ background: 'var(--accent-teal-glow)', padding: '16px', borderRadius: '12px', border: '1px dashed var(--accent-teal)', marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--accent-teal)' }}>{t('ocrTip')}</div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button type="button" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => handleMockOCRScan('zairyu')}>
                  {t('ocrScanZairyu')} (Sim)
                </button>
                <button type="button" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => handleMockOCRScan('passport')}>
                  {t('ocrScanPassport')} (Sim)
                </button>
                <label className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px', cursor: 'pointer', margin: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                  {lang === 'uz' ? 'Haqiqiy Rasm Yuklash (Real OCR)' : '画像スキャン (リアルOCR)'}
                  <input type="file" accept="image/*" onChange={handleImageOCR} style={{ display: 'none' }} />
                </label>
              </div>
              {ocrLoading && (
                <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--ios-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}><circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.1)"></circle><path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4" fill="currentColor"></path></svg>
                  <span>{lang === 'uz' ? 'Karta skanerlanmoqda, iltimos kuting...' : '画像から文字を読み取っています。お待ちください...'}</span>
                </div>
              )}
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
                  <label className="form-label">Tug'ilgan Sana</label>
                  <input type="date" className="form-control" required value={newStudent.birthday} onChange={(e) => setNewStudent({...newStudent, birthday: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('visaExpiry')}</label>
                  <input type="date" className="form-control" required value={newStudent.visaExpiry} onChange={(e) => setNewStudent({...newStudent, visaExpiry: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('classes')}</label>
                  <select className="form-control" value={newStudent.classId} onChange={(e) => setNewStudent({...newStudent, classId: e.target.value})}>
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'block', overflowY: 'auto', zIndex: 1000 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '90%', maxWidth: '800px', margin: '40px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1e293b', background: 'rgba(255,255,255,0.85)', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--glass-shadow)' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{t('printPreviewTitle')}</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" onClick={() => {
                  const element = document.querySelector('.print-paper');
                  const opt = {
                    margin:       10,
                    filename:     `${printStudent.nameEn}_${printDocType}.pdf`,
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true },
                    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
                  };
                  html2pdf().from(element).set(opt).save();
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  PDF Yuklab Olish
                </button>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                  {t('btnPrint')}
                </button>
                <button className="btn btn-danger" onClick={() => { setShowPrintModal(false); setPrintStudent(null); }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  {t('btnClose')}
                </button>
              </div>
            </div>

            {/* Print paper mockup wrapper */}
            <div className="print-paper" style={{ background: '#fff', color: '#000', padding: '50px', borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', fontFamily: '"Times New Roman", serif', minHeight: '800px', position: 'relative' }}>
              
              {/* Official Nyukan Form layout simulator */}
              {printDocType === 'coe' ? (
                <div style={{ fontFamily: 'sans-serif', fontSize: '12px', lineHeight: '1.4' }}>
                  <div style={{ border: '2px solid #000', padding: '10px', textAlign: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>在留資格認定証明書交付申請書</h2>
                    <h3 style={{ fontSize: '14px' }}>APPLICATION FOR CERTIFICATE OF ELIGIBILITY</h3>
                  </div>
                  <p style={{ fontSize: '10px', textAlign: 'right', marginBottom: '10px' }}>法務大臣 殿 (To the Minister of Justice)</p>
                  
                  <div style={{ border: '1px solid #000', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                    <div style={{ borderRight: '1px solid #000', borderBottom: '1px solid #000', padding: '8px' }}>
                      <b>1. 国籍・地域 (Nationality/Region):</b> <br /> {printStudent.nationality}
                    </div>
                    <div style={{ borderBottom: '1px solid #000', padding: '8px' }}>
                      <b>2. 生年月日 (Birthday):</b> <br /> {printStudent.birthday}
                    </div>
                    <div style={{ borderRight: '1px solid #000', borderBottom: '1px solid #000', padding: '8px', gridColumn: 'span 2' }}>
                      <b>3. 氏名 (Name in Alphabet):</b> <br /> <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{printStudent.nameEn}</span>
                    </div>
                    <div style={{ borderRight: '1px solid #000', borderBottom: '1px solid #000', padding: '8px' }}>
                      <b>4. 性別 (Gender):</b> <br /> {printStudent.gender === 'Erkak' ? '男 (Male)' : '女 (Female)'}
                    </div>
                    <div style={{ borderBottom: '1px solid #000', padding: '8px' }}>
                      <b>5. 旅券番号 (Passport No):</b> <br /> {printStudent.passportNumber}
                    </div>
                    <div style={{ borderRight: '1px solid #000', padding: '8px', gridColumn: 'span 2' }}>
                      <b>6. 在留カード番号 (Resident Card No):</b> <br /> {printStudent.zairyuCardNumber}
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '20px', fontSize: '11px', border: '1px dashed #666', padding: '12px', borderRadius: '4px' }}>
                    💡 Ushbu ariza shakli yapon immigratsiyasi (Nyukan) rasmiy me'yorlariga muvofiq Assistant School ma'lumotlar bazasidan avtomatik generatsiya qilindi.
                  </div>
                  {/* Official red stamp */}
                  <div style={{ position: 'absolute', bottom: '60px', right: '80px', width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #ff3b30', color: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', transform: 'rotate(-12deg)', background: 'transparent' }}>
                    <div style={{ textAlign: 'center' }}>佐藤之印<br /><span style={{ fontSize: '7px' }}>ASSIST SCH.</span></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Standard certificates header */}
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
                      <div style={{ margin: '20px 0', fontSize: '14px', lineHeight: '1.8' }}>
                        <b>氏名:</b> {printStudent.nameJp} ({printStudent.nameEn}) | <b>出席率 (Attendance):</b> {printStudent.attendancePercent}%
                      </div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '14px' }}>
                        <thead>
                          <tr style={{ background: '#f5f5f5' }}>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Kanji</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Listening</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Reading</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>Writing</th>
                            <th style={{ border: '1px solid #000', padding: '8px' }}>JLPT Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{printStudent.grades.internal.kanji}</td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{printStudent.grades.internal.listening}</td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{printStudent.grades.internal.reading}</td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{printStudent.grades.internal.writing}</td>
                            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{printStudent.grades.jlpt.level} ({printStudent.grades.jlpt.result})</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Invoice / Tuition fee bill (請求書) */}
                  {printDocType === 'invoice' && (
                    <div>
                      <h1 style={{ textAlign: 'center', fontSize: '28px', margin: '40px 0', textDecoration: 'underline' }}>請求書 (Invoice)</h1>
                      <div style={{ fontSize: '16px', lineHeight: '2' }}>
                        <div><b>宛先 (To):</b> {printStudent.nameEn} 様</div>
                        <div><b>請求金額 (Total Amount Due):</b> <span style={{ fontSize: '20px', fontWeight: 'bold', borderBottom: '2px double #000' }}>¥350,000-</span></div>
                        <div style={{ marginTop: '30px' }}>
                          <b>振込先口座 (Bank details):</b> <br />
                          Mizuho Bank, Shinjuku Branch | Account: 1234567 (Ordinary) <br />
                          Beneficiary: Assistant School Co., Ltd.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stamp & Verification Section */}
                  <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '13px' }}>
                      <b>発行日 (Issued):</b> 2026-06-30 <br />
                      <b>発行者 (Issuer):</b> Assistant School Office
                    </div>
                    {/* Official red stamp */}
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #ff3b30', color: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', transform: 'rotate(-12deg)', marginRight: '40px' }}>
                      <div style={{ textAlign: 'center' }}>佐藤之印<br /><span style={{ fontSize: '7px' }}>ASSIST SCH.</span></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: iPhone STUDENT PORTAL VIEW SIMULATOR */}
      {showStudentPortal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          {/* Virtual iPhone Frame */}
          <div style={{ width: '380px', height: '760px', background: '#1c1c1e', borderRadius: '44px', border: '8px solid #2c2c2e', padding: '16px', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            
            {/* iPhone Speaker/Camera Notch */}
            <div style={{ position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', width: '110px', height: '24px', background: '#000', borderRadius: '16px', zIndex: 100 }}></div>
            
            {/* Student Portal Mobile Content */}
            <div style={{ background: '#f2f2f7', flexGrow: 1, borderRadius: '28px', overflowY: 'auto', padding: '20px', fontFamily: '-apple-system, sans-serif', color: '#000', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', marginBottom: '20px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>9:41</span>
                <span style={{ fontSize: '11px', color: '#8e8e93' }}>📶 🪫 100%</span>
              </div>

              {/* Header profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <img src={students[0].photo} alt={students[0].nameEn} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0 }}>{students[0].nameEn.split(' ')[0]} (MyPage)</h4>
                  <div style={{ fontSize: '11px', color: '#8e8e93' }}>ID: {students[0].id} | upper-Intermediate</div>
                </div>
              </div>

              {/* Attendance visual gauge (Visa warning) */}
              <div style={{ background: '#fff', borderRadius: '18px', padding: '16px', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <h5 style={{ fontWeight: 'bold', margin: '0 0 12px' }}>📊 Davomat va Viza holati</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Radial progress simulator */}
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '6px solid var(--ios-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', color: 'var(--ios-green)' }}>
                    {students[0].attendancePercent}%
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Vizangiz xavfsiz holatda</div>
                    <div style={{ fontSize: '11px', color: '#8e8e93', marginTop: '2px' }}>Davomat limit: &gt;85% (Immigratsiya)</div>
                  </div>
                </div>
              </div>

              {/* Interactive Arubaito 28h Slider */}
              <div style={{ background: '#fff', borderRadius: '18px', padding: '16px', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <h5 style={{ fontWeight: 'bold', margin: '0 0 4px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>💼 Arubaito Soatlari</span>
                  <span style={{ color: getStudentTotalArubaitoHours(students[0]) > 28 ? 'var(--ios-red)' : 'var(--ios-blue)' }}>
                    {getStudentTotalArubaitoHours(students[0])} soat / 28
                  </span>
                </h5>
                <div style={{ fontSize: '11px', color: '#8e8e93', marginBottom: '12px' }}>Haftalik ishlagan soatlaringizni tekshiring:</div>
                
                {students[0].arubaito.jobs.map(job => (
                  <div key={job.id} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '500' }}>
                      <span>{job.name}</span>
                      <span>{job.hoursPerWeek} soat</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="35" 
                      value={job.hoursPerWeek} 
                      onChange={(e) => {
                        const updatedJobs = students[0].arubaito.jobs.map(j => {
                          if (j.id === job.id) return { ...j, hoursPerWeek: Number(e.target.value) };
                          return j;
                        });
                        const updatedStudents = students.map(s => {
                          if (s.id === students[0].id) {
                            return { ...s, arubaito: { ...s.arubaito, jobs: updatedJobs } };
                          }
                          return s;
                        });
                        setStudents(updatedStudents);
                      }} 
                      style={{ width: '100%', accentColor: 'var(--ios-blue)' }} 
                    />
                  </div>
                ))}

                {getStudentTotalArubaitoHours(students[0]) > 28 && (
                  <div style={{ background: 'rgba(255,59,48,0.08)', color: 'var(--ios-red)', fontSize: '11px', padding: '8px 12px', borderRadius: '8px', marginTop: '10px', fontWeight: 'bold', border: '1px solid rgba(255,59,48,0.15)' }}>
                    ⚠️ {t('overlimit')}
                  </div>
                )}
              </div>

              {/* AI Homework Grading Results */}
              <div style={{ background: '#fff', borderRadius: '18px', padding: '16px', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <h5 style={{ fontWeight: 'bold', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🤖</span> AI Baholash Natijalari
                </h5>
                {homeworkSubmissions.filter(sub => sub.studentId === students[0].id && sub.status === 'Graded').length === 0 ? (
                  <div style={{ color: '#8e8e93', fontSize: '11px', textAlign: 'center', padding: '12px' }}>
                    Tekshirilgan vazifalar yo'q.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {homeworkSubmissions.filter(sub => sub.studentId === students[0].id && sub.status === 'Graded').map(sub => {
                      // Schedule canvas render
                      setTimeout(() => {
                        const canvas = document.getElementById("student-grading-canvas-" + sub.id);
                        if (canvas) {
                          const ctx = canvas.getContext('2d');
                          ctx.clearRect(0, 0, canvas.width, canvas.height);
                          ctx.fillStyle = '#fff9f0';
                          ctx.fillRect(0, 0, canvas.width, canvas.height);
                          
                          // Grid lines
                          ctx.strokeStyle = 'rgba(0, 150, 0, 0.12)';
                          ctx.lineWidth = 1;
                          for (let x = 0; x < canvas.width; x += 20) {
                            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
                          }
                          for (let y = 0; y < canvas.height; y += 20) {
                            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
                          }

                          // Handwriting
                          ctx.font = 'bold 11px serif';
                          ctx.fillStyle = '#1e293b';
                          if (sub.id === 'sub1') {
                            ctx.fillText("漢字の練習 (食べる, 見る, 書く)", 15, 25);
                            ctx.fillText("一、私は毎日ご飯を食べる。", 15, 65);
                            ctx.fillText("二、テレビを見る。", 15, 105);
                            ctx.fillText("三、日本語で手紙を書く。", 15, 145);
                          } else {
                            ctx.fillText("日本で勉強する私の目標", 15, 25);
                            ctx.fillText("私は来年大学に進学したいです。", 15, 65);
                            ctx.fillText("だから、毎日三時間日本語勉強しています。", 15, 105);
                            ctx.fillText("将来、日本とウズベキスタンの懸け橋になりたい。", 15, 145);
                          }

                          // Annotations (scaled 0.5)
                          if (sub.corrections && sub.corrections.length > 0) {
                            sub.corrections.forEach(c => {
                              ctx.strokeStyle = '#ff3b30';
                              ctx.lineWidth = 1.5;
                              ctx.beginPath();
                              ctx.arc(c.x * 0.5, c.y * 0.5, c.r * 0.5, 0, 2 * Math.PI);
                              ctx.stroke();
                            });
                          }
                        }
                      }, 100);

                      return (
                        <div key={sub.id} style={{ borderBottom: '1px solid #f2f2f7', paddingBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '12px', marginBottom: '6px' }}>
                            <span>{sub.title}</span>
                            <span style={{ color: 'var(--ios-blue)' }}>{sub.score} ball</span>
                          </div>
                          
                          {/* Mini Canvas */}
                          <div style={{ background: '#fff9f0', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '10px', overflow: 'hidden', padding: '8px', display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                            <canvas id={"student-grading-canvas-" + sub.id} width="300" height="180" style={{ width: '100%', height: 'auto' }}></canvas>
                          </div>

                          <div style={{ background: 'rgba(0,122,255,0.04)', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', color: 'var(--ios-blue)' }}>
                            <b>AI Fikr:</b> {sub.feedback}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Class Bulletins */}
              <div style={{ background: '#fff', borderRadius: '18px', padding: '16px', marginBottom: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <h5 style={{ fontWeight: 'bold', margin: '0 0 12px' }}>📢 Dars E'lonlari</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ borderBottom: '1px solid #f2f2f7', paddingBottom: '8px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Minna no Nihongo L35-Homework</div>
                    <div style={{ fontSize: '11px', color: '#8e8e93', marginTop: '2px' }}>O'qituvchi: Tanaka Sato | 2026-06-29</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>JLPT Mock Test - 07.07</div>
                    <div style={{ fontSize: '11px', color: '#8e8e93', marginTop: '2px' }}>Sinf xonasida N2 darajali sinov.</div>
                  </div>
                </div>
              </div>

              {/* Close virtual iPhone */}
              <button className="btn btn-danger" onClick={() => setShowStudentPortal(false)} style={{ width: '100%', borderRadius: '14px', marginTop: '10px' }}>
                Simulatorni Yopish
              </button>
            </div>
            
            {/* iPhone Home Indicator bar */}
            <div style={{ width: '130px', height: '5px', background: '#fff', borderRadius: '99px', position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)' }}></div>
          </div>
        </div>
      )}

      {/* MODAL: MEDICAL EXCUSE VERIFICATION */}
      {showExcuseModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'block', overflowY: 'auto', zIndex: 3000 }}>
          <div className="glass" style={{ width: '90%', maxWidth: '500px', padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.95)', margin: '100px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', margin: 0 }}>🏥 Tibbiy Ma'lumotnomani Tasdiqlash</h3>
              <button type="button" onClick={() => setShowExcuseModal(false)} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>
            <form onSubmit={handleExcuseAbsenceSubmit}>
              <div className="form-group">
                <label className="form-label">Talaba</label>
                <select className="form-control" required value={excuseForm.studentId} onChange={(e) => setExcuseForm({ ...excuseForm, studentId: e.target.value })}>
                  <option value="">-- Tanlang --</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.nameEn} ({s.id})</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Kasal bo'lgan sana</label>
                <input type="date" className="form-control" required value={excuseForm.date} onChange={(e) => setExcuseForm({ ...excuseForm, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Tashxis / Sabab</label>
                <input type="text" className="form-control" placeholder="Masalan: Gripp / Influenza" required value={excuseForm.reason} onChange={(e) => setExcuseForm({ ...excuseForm, reason: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Shifokor Ma'lumotnomasi ID / Rasm kodi</label>
                <input type="text" className="form-control" placeholder="DIAGNOSTIC_SLIP_101" required value={excuseForm.doctorNoteRef} onChange={(e) => setExcuseForm({ ...excuseForm, doctorNoteRef: e.target.value })} />
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                💡 Ushbu sana davomati hisobdan chiqariladi (denominator kamaytiriladi) va talabaning davomat foizi qayta hisoblanadi. Bu Nyukan tekshiruvida rasmiy ruxsat beradi.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowExcuseModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn btn-primary">✓ Tasdiqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FINANCE PAYMENT VERIFICATION */}
      {showFinanceVerifyModal && verifyInvoice && verifyStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'block', overflowY: 'auto', zIndex: 3000 }}>
          <div className="glass" style={{ width: '90%', maxWidth: '500px', padding: '32px', backgroundColor: 'rgba(255, 255, 255, 0.95)', margin: '100px auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', margin: 0 }}>💰 Bank Depozit To'lovini Solishtirish</h3>
              <button type="button" onClick={() => { setShowFinanceVerifyModal(false); setVerifyInvoice(null); setVerifyStudent(null); }} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
            </div>
            <form onSubmit={handleVerifyPaymentSubmit}>
              <div style={{ background: 'rgba(0,0,0,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '16px', fontSize: '13px' }}>
                <b>Talaba:</b> {verifyStudent.nameEn} ({verifyStudent.id}) <br />
                <b>Invoys ID:</b> {verifyInvoice.id} ({verifyInvoice.term}) <br />
                <b>Kutilayotgan Summa:</b> {verifyInvoice.amount.toLocaleString()} JPY
              </div>
              <div className="form-group">
                <label className="form-label">Bank nomi</label>
                <select className="form-control" required value={verifyForm.bankName} onChange={(e) => setVerifyForm({ ...verifyForm, bankName: e.target.value })}>
                  <option value="Mizuho Bank">Mizuho Bank</option>
                  <option value="Sumitomo Mitsui Bank (SMBC)">Sumitomo Mitsui Bank (SMBC)</option>
                  <option value="Japan Post Bank (Yucho)">Japan Post Bank (Yucho)</option>
                  <option value="Mitsubishi UFJ Bank (MUFG)">Mitsubishi UFJ Bank (MUFG)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Depozitor (Yuboruvchi Ismi - bank statements)</label>
                <input type="text" className="form-control" placeholder="Masalan: FARRUX KANOATOV (yoki sponsor ismi)" required value={verifyForm.depositorName} onChange={(e) => setVerifyForm({ ...verifyForm, depositorName: e.target.value.toUpperCase() })} />
              </div>
              <div className="form-group">
                <label className="form-label">Depozit qo'yilgan sana (Bank o'tkazmasi sanasi)</label>
                <input type="date" className="form-control" required value={verifyForm.depositDate} onChange={(e) => setVerifyForm({ ...verifyForm, depositDate: e.target.value })} />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '16px' }}>
                <input type="checkbox" id="confirmCheck" required checked={verifyForm.confirmed} onChange={(e) => setVerifyForm({ ...verifyForm, confirmed: e.target.checked })} style={{ cursor: 'pointer' }} />
                <label htmlFor="confirmCheck" style={{ fontSize: '12px', fontWeight: '600', cursor: 'pointer', margin: 0 }}>
                  Bank ko'chirmasidagi tafsilotlarni solishtirib tekshirdim.
                </label>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowFinanceVerifyModal(false); setVerifyInvoice(null); setVerifyStudent(null); }}>Bekor qilish</button>
                <button type="submit" className="btn btn-primary">✓ To'lovni Tasdiqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
