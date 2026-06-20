const babel = require('@babel/core');
const files = [
  'src/pages/Dashboard.jsx',
  'src/components/core/Dashboard/Sidebar.jsx',
  'src/components/core/Dashboard/SidebarLink.jsx',
];
let ok = true;
for (const f of files) {
  try {
    babel.transformFileSync(f, { presets: [require.resolve('babel-preset-react-app')] });
    console.log('OK:', f);
  } catch (e) {
    ok = false;
    console.log('FAIL:', f, '\n', e.message.split('\n').slice(0,8).join('\n'));
  }
}
process.exit(ok ? 0 : 1);
