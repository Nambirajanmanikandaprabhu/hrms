@@ .. @@
 import React, { useState, useEffect } from 'react';
-import { useNavigate } from 'react-router-dom';
+import { useNavigate, Link } from 'react-router-dom';

 const DailyAttendance = () => {
+  const navigate = useNavigate();
   const [attendance, setAttendance] = useState({
@@ .. @@
       <div className="attendance-history-link">
         <button onClick={() => navigate('/attendance/history')}>
           View My Attendance History
         </button>
       </div>
     </div>
   );
 };

 export default DailyAttendance;