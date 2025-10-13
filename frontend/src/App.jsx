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
// const AdmissionEnquiryPage = lazy(() => import("@/routes/front-office/admission-enquiry"));
// const VisitorsBookPage = lazy(() => import("@/routes/front-office/visitors-book"));
// const PostalDispatchPage = lazy(() => import("@/routes/front-office/postal-dispatch"));
// const PostalReceivePage = lazy(() => import("@/routes/front-office/postal-receive"));
// const ComplainPage = lazy(() => import("@/routes/front-office/complain"));
// const SetupFrontOfficePage = lazy(() => import("@/routes/front-office/setup-front-office"));
// const GatePassPage = lazy(() => import("@/routes/front-office/gate-pass"));
// const EntranceExamFormPage = lazy(() => import("@/routes/front-office/entrance-exam-form"));

// Simulated authentication check
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

// PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  return authenticated ? children : <Navigate to="/login" replace />;
};

// ✅ Router Definition
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        element: (
          <PrivateRoute>
            <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
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

          // ✅ FRONT OFFICE ROUTES (Dropdown Items)
          // { path: "front-office", element: <FrontOfficePage /> },
          // { path: "front-office/admission-enquiry", element: <AdmissionEnquiryPage /> },
          // { path: "front-office/visitors-book", element: <VisitorsBookPage /> },
          // { path: "front-office/postal-dispatch", element: <PostalDispatchPage /> },
          // { path: "front-office/postal-receive", element: <PostalReceivePage /> },
          // { path: "front-office/complain", element: <ComplainPage /> },
          // { path: "front-office/setup-front-office", element: <SetupFrontOfficePage /> },
          // { path: "front-office/gate-pass", element: <GatePassPage /> },
          // { path: "front-office/entrance-exam-form", element: <EntranceExamFormPage /> },

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
