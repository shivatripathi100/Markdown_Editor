import TitleBar from '../TitleBar/TitleBar';
import { useMarkdown } from '../../providers/MarkdownProvider';
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import './Preview.css';

const Preview = () => {
  const [markdown] = useMarkdown();
  const [html, setHtml] = useState('');

  useEffect(() => {
    const convertMarkdown = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/convert`, { markdown });
        setHtml(response.data.html);
      } catch (error) {
        console.error('Error converting markdown:', error);
      }
    };
    convertMarkdown();
  }, [markdown]);

  useEffect(() => {
    const highlightCode = () => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    };
    highlightCode();
  }, [html]);

  return (
    <div className="preview">
      <TitleBar title="Preview" />
      <div className="preview__scroll" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default Preview;
