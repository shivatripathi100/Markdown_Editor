import TitleBar from '../TitleBar/TitleBar';
import { useMarkdown } from '../../providers/MarkdownProvider';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useEffect, useState } from 'react';
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

  return (
    <div className="preview">
      <TitleBar title="Preview" />
      <div className="preview__scroll" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default Preview;
