const fs = require('fs');
const root = 'c:/Users/sures/OneDrive/Desktop/Sangamsathi/sangamsathi/';

const adminPath = root + 'src/components/Admin/AdminDashboard.jsx';
let content = fs.readFileSync(adminPath, 'utf8');
content = content
  .replace(/#1976d2/g, '#800000')   // MUI blue -> Maroon
  .replace(/#1565c0/g, '#A52A2A')   // MUI dark blue -> Light Maroon
  .replace(/'aqua'/gi, "'#FFD700'") // aqua -> Yellow
  .replace(/'darkaqua'/gi, "'#E8A54B'"); // darkaqua -> Dark Yellow (custom hover)

fs.writeFileSync(adminPath, content);
console.log('Updated AdminDashboard.jsx');

const sidebarPath = root + 'src/components/PromotersDash/sidebar/Sidebar.jsx';
let sidebar = fs.readFileSync(sidebarPath, 'utf8');
sidebar = sidebar
  .replace(/#182848/gi, '#800000') // Drawer bg
  .replace(/#D4AF37/gi, '#FFD700') // Gold border to Yellow
  .replace(/rgba\(\s*212,\s*175,\s*55/g, 'rgba(255, 215, 0'); // Gold rgba to Yellow rgba

fs.writeFileSync(sidebarPath, sidebar);
console.log('Updated Sidebar.jsx');
