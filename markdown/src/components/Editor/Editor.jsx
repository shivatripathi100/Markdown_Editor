import { useState, useEffect } from 'react';
import TitleBar from '../TitleBar/TitleBar';
import { useMarkdown } from '../../providers/MarkdownProvider';
import './Editor.css';

const Editor = () => {
  const [markdown, setMarkdown] = useMarkdown();
  const [words, setWords] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    updateCounts(markdown);
  }, [markdown]);

  const updateCounts = (value) => {
    const wordCount = getWordsCount(value);
    const charCount = getCharsCount(value);
    setWords(wordCount);
    setChars(charCount);
  };

  const getWordsCount = (str) => {
    return str.match(/(\w+)/g)?.length ?? 0;
  };

  const getCharsCount = (str) => {
    return str.length;
  };

  const updateMarkdown = (event) => {
    const value = event.target.value;
    setMarkdown(value);
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = 'Untitled.md';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="editor__wrap">
      <TitleBar title="Editor" aside={`${words} Words ${chars} Characters`} />
      <textarea
        className="editor"
        value={markdown}
        onChange={updateMarkdown}
      />
      <button onClick={downloadFile}>Download File</button>
    </div>
  );
}

export default Editor;
