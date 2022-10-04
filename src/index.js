import { createRoot } from "react-dom/client";
import './index.css';
import Main from "./components/layouts/Main"

import './plugins/msw';
import './plugins/i18n';


// APPLICATION
const root = createRoot(document.getElementById('root'))
root.render(<Main />)