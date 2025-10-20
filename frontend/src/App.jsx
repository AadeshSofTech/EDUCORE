import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { Suspense, lazy } from "react";

// Lazy imports for pages
const Layout = lazy(() => import("@/routes/layout"));
const DashboardPage = lazy(() => import("@/routes/dashboard/page"));
const AdmissionPage = lazy(() => import("@/routes/admission/page"));
const AdmitStudentPage = lazy(() => import("@/routes/admission/admit-student"));
const AdmitBulkStudentPage = lazy(() => import("@/routes/admission/admit-bulk-student"));
const PrintFormPage = lazy(() => import("@/routes/admission/print-forms"));
const RequestsPage = lazy(() => import("@/routes/admission/requests"));
const EnquiriesPage = lazy(() => import("@/routes/admission/enquiries"));
const ClassPage = lazy(() => import("@/routes/class/page"));
const TeachersPage = lazy(() => import("@/routes/teachers/page"));
const TeacherCreateFormPage = lazy(() => import("@/routes/teachers/teachercreateform"));
const StudentManagementPage = lazy(() => import("@/routes/student-management/page"));
const ProfilePage = lazy(() => import("@/routes/student-management/profiles"));
const AttendanceTrackingPage = lazy(() => import("@/routes/student-management/attendance-tracking"));
const AdmissionsPage = lazy(() => import("@/routes/student-management/admissions"));
const DisciplineRecordsPage = lazy(() => import("@/routes/student-management/discipline-records"));
const PromotionTransferPage = lazy(() => import("@/routes/student-management/promotion-transfer"));
const HomeworkPage = lazy(() => import("@/routes/homework/page"));
const AttendancePage = lazy(() => import("@/routes/attendance/page"));
const PaymentPage = lazy(() => import("@/routes/payment/page"));
const LibraryPage = lazy(() => import("@/routes/library/page"));
const HostelPage = lazy(() => import("@/routes/hostel/page"));
const TransportsPage = lazy(() => import("@/routes/transports/page"));
const ReportPage = lazy(() => import("@/routes/report/page"));
const SettingsPage = lazy(() => import("@/routes/settings/page"));
const NotFoundPage = lazy(() => import("@/routes/not-found"));
const RegisterPage = lazy(() => import("@/routes/register/page"));
const LoginPage = lazy(() => import("@/routes/login/page"));

// ✅ New ERP Pages
const SearchPage = lazy(() => import("@/routes/search/page"));
// const FrontOfficePage = lazy(() => import("@/routes/front-office/page")); // ✅ Main front office page
const FeesCollectionPage = lazy(() => import("@/routes/fees-collection/page"));
const IncomePage = lazy(() => import("@/components/GenericPage"));
const ExpensePage = lazy(() => import("@/components/GenericPage"));
const StudentInfoPage = lazy(() => import("@/routes/student-info/page"));
const AcademicsPage = lazy(() => import("@/components/GenericPage"));
const ExaminationsPage = lazy(() => import("@/components/GenericPage"));
const OnlineExamPage = lazy(() => import("@/components/GenericPage"));
const OnlineClassPage = lazy(() => import("@/components/GenericPage"));
const PrimaryEvaluationPage = lazy(() => import("@/components/GenericPage"));
const QuestionPaperPage = lazy(() => import("@/components/GenericPage"));
const DisciplinaryPage = lazy(() => import("@/components/GenericPage"));
const DownloadCenterPage = lazy(() => import("@/components/GenericPage"));
const LessonPlannerPage = lazy(() => import("@/components/GenericPage"));
const HomeworkClassworkPage = lazy(() => import("@/components/GenericPage"));
const CommunicatePage = lazy(() => import("@/components/GenericPage"));
const HumanResourcePage = lazy(() => import("@/components/GenericPage"));
const InventoryPage = lazy(() => import("@/components/GenericPage"));
const TransportPage = lazy(() => import("@/components/GenericPage"));
const CertificatePage = lazy(() => import("@/components/GenericPage"));
const ConsentLetterPage = lazy(() => import("@/components/GenericPage"));
const NoticeBoardPage = lazy(() => import("@/components/GenericPage"));
const StudentWalletPage = lazy(() => import("@/components/GenericPage"));
const BankInfoPage = lazy(() => import("@/components/GenericPage"));
const FrontCMSPage = lazy(() => import("@/components/GenericPage"));
const SubscriptionPage = lazy(() => import("@/components/GenericPage"));
const SystemSettingsPage = lazy(() => import("@/components/GenericPage"));

// ✅ FRONT OFFICE SUBPAGES
const AdmissionEnquiryPage = lazy(() => import("@/routes/front-office/admission-enquiry"));
// const VisitorsBookPage = lazy(() => import("@/routes/front-office/visitors-book"));
// const PostalDispatchPage = lazy(() => import("@/routes/front-office/postal-dispatch"));
// const PostalReceivePage = lazy(() => import("@/routes/front-office/postal-receive"));
// const ComplainPage = lazy(() => import("@/routes/front-office/complain"));
// const SetupFrontOfficePage = lazy(() => import("@/routes/front-office/setup-front-office"));
// const GatePassPage = lazy(() => import("@/routes/front-office/gate-pass"));
// const EntranceExamFormPage = lazy(() => import("@/routes/front-office/entrance-exam-form"));

// ---------- Fees Collection Pages ----------
// const CollectFeePage = lazy(() => import("@/routes/fees/collect-fee"));
// const PaymentReceiptPage = lazy(() => import("@/routes/fees/payment-receipt"));
// const OnlineAdmissionFeePage = lazy(() => import("@/routes/fees/online-admission-fee"));
// const DemandNoticePage = lazy(() => import("@/routes/fees/demand-notice"));
// const CarryForwardPage = lazy(() => import("@/routes/fees/carry-forward"));
// const FeeDiscountPage = lazy(() => import("@/routes/fees/discount"));
// const FeeMasterPage = lazy(() => import("@/routes/fees/master"));
// const FeesGroupPage = lazy(() => import("@/routes/fees/group"));
// const FeesTypesPage = lazy(() => import("@/routes/fees/types"));
// const FeeFollowUpPage = lazy(() => import("@/routes/fees/follow-up"));
// const ChequesPage = lazy(() => import("@/routes/fees/cheques"));
// const FeesReportsPage = lazy(() => import("@/routes/fees/reports"));

// --- Income Pages ---
// import AddIncome from "@/pages/income/AddIncome";
// import SearchIncome from "@/pages/income/SearchIncome";
// import IncomeHead from "@/pages/income/IncomeHead";

// ------- student info -------
// import StudentAdmission from "./pages/studentInfo/StudentAdmission";
// import OnlineAdmission from "./pages/studentInfo/OnlineAdmission";
// import StudentDetails from "./pages/studentInfo/StudentDetails";
// import StudentCategory from "./pages/studentInfo/StudentCategory";
// import House from "./pages/studentInfo/House";
// import StudentReferral from "./pages/studentInfo/StudentReferral";
// import InactiveStudents from "./pages/studentInfo/InactiveStudents";
// import LinkSiblings from "./pages/studentInfo/LinkSiblings";
// import StudentUpdate from "./pages/studentInfo/StudentUpdate";
// import StudentReports from "./pages/studentInfo/StudentReports";

// Attendance Pages

// import StudentAttendance from "@/pages/Attendance/StudentAttendance";
// import StaffAttendance from "@/pages/Attendance/StaffAttendance";
// import AttendanceType from "@/pages/Attendance/AttendanceType";
// import AttendanceReport from "@/pages/Attendance/AttendanceReport";

// Academics Pages

// import ClassTimeTable from "@/pages/Academics/ClassTimeTable";
// import TeacherTimetable from "@/pages/Academics/TeacherTimetable";
// import DailyTimeTable from "@/pages/Academics/DailyTimeTable";
// import CoCurricularSubject from "@/pages/Academics/CoCurricularSubject";
// import Subject from "@/pages/Academics/Subject";
// import AssignSubjects from "@/pages/Academics/AssignSubjects";
// import StudentSubjects from "@/pages/Academics/StudentSubjects";
// import AssignClassTeacher from "@/pages/Academics/AssignClassTeacher";
// import Class from "@/pages/Academics/Class";
// import Section from "@/pages/Academics/Section";
// import PromoteStudents from "@/pages/Academics/PromoteStudents";

// Examinations Pages
// import TermList from "@/routes/examinations/term-list";
// import ExamList from "@/routes/examinations/exam-list";
// import ExamSchedule from "@/routes/examinations/exam-schedule";
// import AdmitCard from "@/routes/examinations/admit-card";
// import MarksRegister from "@/routes/examinations/marks-register";
// import CoCurricularGrade from "@/routes/examinations/co-curricular-grade";
// import TeacherRemark from "@/routes/examinations/teacher-remark";
// import GradeList from "@/routes/examinations/grade-list";
// import Division from "@/routes/examinations/division";
// import ExamAttendance from "@/routes/examinations/attendance";
// import ReportCard from "@/routes/examinations/report-card";
// import ExaminationReport from "@/routes/examinations/examination-report";

// Online Exam Pages

// const OnlineExam = lazy(() => import("@/routes/online-exam/exams"));
// const QuestionBank = lazy(() => import("@/routes/online-exam/question-bank"));
// const ExamReport = lazy(() => import("@/routes/online-exam/exam-report"));
// const StudentExamReport = lazy(() => import("@/routes/online-exam/student-exam-report"));

// Online Class Pages

// const OnlineClass = lazy(() => import("@/routes/online-class/class"));
// const OnlineClassTeacherTimetable = lazy(() => import("@/routes/online-class/teacher-timetable"));
// const OnlineClassAttendanceReport = lazy(() => import("@/routes/online-class/attendance-report"));

// Primary Evaluation Pages

// const ActivityPage = lazy(() => import("@/routes/primary-evaluation/activity"));
// const AssessmentPage = lazy(() => import("@/routes/primary-evaluation/assessment"));
// const EvaluationRemarkPage = lazy(() => import("@/routes/primary-evaluation/evaluation-remark"));
// const PrimaryClassReportPage = lazy(() => import("@/routes/primary-evaluation/primary-class-report"));

// Question Paper Pages

// import QuestionTypePage from "@/pages/question-paper/QuestionTypePage";
// import QuestionPage from "@/pages/question-paper/QuestionPage";
// import GenerateQuestionPage from "@/pages/question-paper/GenerateQuestionPage";

// Disciplinary Pages

// import ParameterPage from "@/routes/disciplinary/parameter";
// import AssessmentPage from "@/routes/disciplinary/assessment";
// import DisciplinaryReportPage from "@/routes/disciplinary/report";

// Download Center Pages

// const UploadContentPage = lazy(() => import("@/routes/download-center/upload-content"));
// const AssignmentsPage = lazy(() => import("@/routes/download-center/assignments"));
// const StudyMaterialPage = lazy(() => import("@/routes/download-center/study-material"));
// const SyllabusPage = lazy(() => import("@/routes/download-center/syllabus"));
// const OtherDownloadsPage = lazy(() => import("@/routes/download-center/other-downloads"));
// const VideosPage = lazy(() => import("@/routes/download-center/videos"));

// Simulated authentication check
const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;
};

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
    const authenticated = isAuthenticated();
    return authenticated ? (
        children
    ) : (
        <Navigate
            to="/login"
            replace
        />
    );
};

// ✅ Router Definition
const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: (
                    <Suspense
                        fallback={
                            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
                                {/* Spinner */}
                                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                                {/* Loading text with subtle animation */}
                                <p className="animate-pulse text-lg font-semibold text-gray-600">Loading, please wait...</p>
                            </div>
                        }
                    >
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: "register",
                element: (
                    <Suspense
                        fallback={
                            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
                                {/* Spinner */}
                                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                                {/* Loading text with subtle animation */}
                                <p className="animate-pulse text-lg font-semibold text-gray-600">Loading, please wait...</p>
                            </div>
                        }
                    >
                        <RegisterPage />
                    </Suspense>
                ),
            },
            {
                path: "login",
                element: (
                    <Suspense
                        fallback={
                            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
                                {/* Spinner */}
                                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                                {/* Loading text with subtle animation */}
                                <p className="animate-pulse text-lg font-semibold text-gray-600">Loading, please wait...</p>
                            </div>
                        }
                    >
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                element: (
                    <PrivateRoute>
                        <Suspense
                            fallback={
                                <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
                                    {/* Spinner */}
                                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                                    {/* Loading text with subtle animation */}
                                    <p className="animate-pulse text-lg font-semibold text-gray-600">Loading, please wait...</p>
                                </div>
                            }
                        >
                            <Layout />
                        </Suspense>
                    </PrivateRoute>
                ),
                children: [
                    { path: "dashboard", element: <DashboardPage /> },

                    // Original Routes
                    { path: "admission", element: <AdmissionPage /> },
                    { path: "admit-student", element: <AdmitStudentPage /> },
                    { path: "admit-bulk-student", element: <AdmitBulkStudentPage /> },
                    { path: "print-forms", element: <PrintFormPage /> },
                    { path: "requests", element: <RequestsPage /> },
                    { path: "enquiries", element: <EnquiriesPage /> },
                    { path: "class", element: <ClassPage /> },
                    { path: "teachers", element: <TeachersPage /> },
                    { path: "teachercreateform", element: <TeacherCreateFormPage /> },
                    { path: "student-management", element: <StudentManagementPage /> },
                    { path: "attendance-tracking", element: <AttendanceTrackingPage /> },
                    { path: "admissions", element: <AdmissionsPage /> },
                    { path: "profiles", element: <ProfilePage /> },
                    { path: "promotion-transfer", element: <PromotionTransferPage /> },
                    { path: "discipline-records", element: <DisciplineRecordsPage /> },
                    { path: "homework", element: <HomeworkPage /> },
                    { path: "attendance", element: <AttendancePage /> },
                    { path: "payment", element: <PaymentPage /> },
                    { path: "library", element: <LibraryPage /> },
                    { path: "hostel", element: <HostelPage /> },
                    { path: "transports", element: <TransportsPage /> },
                    { path: "report", element: <ReportPage /> },
                    { path: "settings", element: <SettingsPage /> },

                    // -------------- FRONT OFFICE ROUTES (Dropdown Items) --------------
                    // { path: "front-office", element: <FrontOfficePage /> },
                    // { path: "front-office/admission-enquiry", element: <AdmissionEnquiryPage /> },
                    // { path: "front-office/visitors-book", element: <VisitorsBookPage /> },
                    // { path: "front-office/postal-dispatch", element: <PostalDispatchPage /> },
                    // { path: "front-office/postal-receive", element: <PostalReceivePage /> },
                    // { path: "front-office/complain", element: <ComplainPage /> },
                    // { path: "front-office/setup-front-office", element: <SetupFrontOfficePage /> },
                    // { path: "front-office/gate-pass", element: <GatePassPage /> },
                    // { path: "front-office/entrance-exam-form", element: <EntranceExamFormPage /> },

                    // ---------- Fees Collection Sub-Routes ----------
                    // { path: "fees/collect-fee", element: <CollectFeePage /> },
                    // { path: "fees/payment-receipt", element: <PaymentReceiptPage /> },
                    // { path: "fees/online-admission-fee", element: <OnlineAdmissionFeePage /> },
                    // { path: "fees/demand-notice", element: <DemandNoticePage /> },
                    // { path: "fees/carry-forward", element: <CarryForwardPage /> },
                    // { path: "fees/discount", element: <FeeDiscountPage /> },
                    // { path: "fees/master", element: <FeeMasterPage /> },
                    // { path: "fees/group", element: <FeesGroupPage /> },
                    // { path: "fees/types", element: <FeesTypesPage /> },
                    // { path: "fees/follow-up", element: <FeeFollowUpPage /> },
                    // { path: "fees/cheques", element: <ChequesPage /> },
                    // { path: "fees/reports", element: <FeesReportsPage /> },

                    // ---------- Income Sub-Routes ----------

                    // { path: "income/add-income", element: <AddIncome /> },
                    // { path: "income/search-income", element: <SearchIncome /> },
                    // { path: "income/income-head", element: <IncomeHead /> },

                    // ---------- Student Info ----------

                    // { path: "student-info", element: <StudentInfoPage /> },
                    // { path: "student-info/admission", element: <StudentAdmissionPage /> },
                    // { path: "student-info/online-admission", element: <OnlineAdmissionPage /> },
                    // { path: "student-info/details", element: <StudentDetailsPage /> },
                    // { path: "student-info/category", element: <StudentCategoryPage /> },
                    // { path: "student-info/house", element: <HousePage /> },
                    // { path: "student-info/referral", element: <StudentReferralPage /> },
                    // { path: "student-info/inactive", element: <InactiveStudentsPage /> },
                    // { path: "student-info/siblings", element: <LinkSiblingsPage /> },
                    // { path: "student-info/update", element: <StudentUpdatePage /> },
                    // { path: "student-info/reports", element: <StudentReportsPage /> },

                    // ---------- Attendance Sub-Routes ----------

                    // { path: "attendance/student", element: <StudentAttendance /> },
                    // { path: "attendance/staff", element: <StaffAttendance /> },
                    // { path: "attendance/attendance-type", element: <AttendanceType /> },
                    // { path: "attendance/attendance-report", element: <AttendanceReport /> },

                    // ---------- Academics Sub-Routes ----------

                    // { path: "academics/class-time-table", element: <ClassTimeTable /> },
                    // { path: "academics/teacher-timetable", element: <TeacherTimetable /> },
                    // { path: "academics/daily-time-table", element: <DailyTimeTable /> },
                    // { path: "academics/co-curricular-subject", element: <CoCurricularSubject /> },
                    // { path: "academics/subject", element: <Subject /> },
                    // { path: "academics/assign-subjects", element: <AssignSubjects /> },
                    // { path: "academics/student-subjects", element: <StudentSubjects /> },
                    // { path: "academics/assign-class-teacher", element: <AssignClassTeacher /> },
                    // { path: "academics/class", element: <Class /> },
                    // { path: "academics/section", element: <Section /> },
                    // { path: "academics/promote-students", element: <PromoteStudents /> },

                    // -------------- Examinations --------------

                    // { path: "examinations/term-list", element: <TermList /> },
                    // { path: "examinations/exam-list", element: <ExamList /> },
                    // { path: "examinations/exam-schedule", element: <ExamSchedule /> },
                    // { path: "examinations/admit-card", element: <AdmitCard /> },
                    // { path: "examinations/marks-register", element: <MarksRegister /> },
                    // { path: "examinations/co-curricular-grade", element: <CoCurricularGrade /> },
                    // { path: "examinations/teacher-remark", element: <TeacherRemark /> },
                    // { path: "examinations/grade-list", element: <GradeList /> },
                    // { path: "examinations/division", element: <Division /> },
                    // { path: "examinations/attendance", element: <ExamAttendance /> },
                    // { path: "examinations/report-card", element: <ReportCard /> },
                    // { path: "examinations/examination-report", element: <ExaminationReport /> },

                    // ---------- Online Exam ----------

                    // { path: "online-exam/exams", element: <OnlineExam /> },
                    // { path: "online-exam/question-bank", element: <QuestionBank /> },
                    // { path: "online-exam/exam-report", element: <ExamReport /> },
                    // { path: "online-exam/student-exam-report", element: <StudentExamReport /> },

                    // ---------- Online Class ----------

                    // { path: "online-class/class", element: <OnlineClass /> },
                    // { path: "online-class/teacher-timetable", element: <OnlineClassTeacherTimetable /> },
                    // { path: "online-class/attendance-report", element: <OnlineClassAttendanceReport /> },

                    // ---------- Primary Evaluation ----------

                    // { path: "primary-evaluation/activity", element: <ActivityPage /> },
                    // { path: "primary-evaluation/assessment", element: <AssessmentPage /> },
                    // { path: "primary-evaluation/evaluation-remark", element: <EvaluationRemarkPage /> },
                    // { path: "primary-evaluation/primary-class-report", element: <PrimaryClassReportPage /> },

                    // ---------- Question Paper ----------

                    // { path: "question-paper/question-type", element: <QuestionTypePage /> },
                    // { path: "question-paper/questions", element: <QuestionPage /> },
                    // { path: "question-paper/generate-question", element: <GenerateQuestionPage /> },

                    // ---------- Disciplinary ----------

                    // { path: "disciplinary/parameter", element: <ParameterPage /> },
                    // { path: "disciplinary/assessment", element: <AssessmentPage /> },
                    // { path: "disciplinary/report", element: <DisciplinaryReportPage /> },

                    // ---------- Download Center ----------

                    // { path: "download-center/upload-content", element: <UploadContentPage /> },
                    // { path: "download-center/assignments", element: <AssignmentsPage /> },
                    // { path: "download-center/study-material", element: <StudyMaterialPage /> },
                    // { path: "download-center/syllabus", element: <SyllabusPage /> },
                    // { path: "download-center/other-downloads", element: <OtherDownloadsPage /> },
                    // { path: "download-center/videos", element: <VideosPage /> },

                    // Other ERP routes
                    { path: "search", element: <SearchPage /> },
                    { path: "fees-collection", element: <FeesCollectionPage /> },
                    { path: "income", element: <IncomePage /> },
                    { path: "expense", element: <ExpensePage /> },
                    { path: "student-info", element: <StudentInfoPage /> },
                    { path: "academics", element: <AcademicsPage /> },
                    { path: "examinations", element: <ExaminationsPage /> },
                    { path: "online-exam", element: <OnlineExamPage /> },
                    { path: "online-class", element: <OnlineClassPage /> },
                    { path: "primary-evaluation", element: <PrimaryEvaluationPage /> },
                    { path: "question-paper", element: <QuestionPaperPage /> },
                    { path: "disciplinary", element: <DisciplinaryPage /> },
                    { path: "download-center", element: <DownloadCenterPage /> },
                    { path: "lesson-planner", element: <LessonPlannerPage /> },
                    { path: "homework-classwork", element: <HomeworkClassworkPage /> },
                    { path: "communicate", element: <CommunicatePage /> },
                    { path: "human-resource", element: <HumanResourcePage /> },
                    { path: "inventory", element: <InventoryPage /> },
                    { path: "transport", element: <TransportPage /> },
                    { path: "certificate", element: <CertificatePage /> },
                    { path: "consent-letter", element: <ConsentLetterPage /> },
                    { path: "notice-board", element: <NoticeBoardPage /> },
                    { path: "student-wallet", element: <StudentWalletPage /> },
                    { path: "bank-info", element: <BankInfoPage /> },
                    { path: "front-cms", element: <FrontCMSPage /> },
                    { path: "subscription", element: <SubscriptionPage /> },
                    { path: "system-settings", element: <SystemSettingsPage /> },

                    { path: "*", element: <NotFoundPage /> },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
