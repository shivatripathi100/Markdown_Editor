import MainLayout from './components/MainLayout/MainLayout';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';
import MarkdownProvider from './providers/MarkdownProvider';
import './index.css';

const App = () => (
  <MarkdownProvider>
    <MainLayout>
      <MainLayout.Column>
        <Editor />
      </MainLayout.Column>
      <MainLayout.Column>
        <Preview />
      </MainLayout.Column>
    </MainLayout>
  </MarkdownProvider>
);

export default App;