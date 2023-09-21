import { useState, useEffect } from 'react';
import { BsLink, BsSend, BsClipboardPlus } from 'react-icons/bs';
import { PiSpinnerGapBold } from 'react-icons/pi';
import { useLazyGetSummaryQuery } from '../services/text';

const Summarizer = () => {
  const [text, setText] = useState({
    url: '',
    paragraphs: '3',
    summary: '',
  })

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const textsFromLocalStorage = JSON.parse(
      localStorage.getItem('texts') as string
    );

    if (textsFromLocalStorage) {
      setAllTexts(textsFromLocalStorage);
    }
  }, []);

  const [allTexts, setAllTexts] = useState<any[]>([]);

  const formSubmit = async (e: React.SyntheticEvent) => { 
    e.preventDefault();
    const { data } = await getSummary({ url: text.url, paragraphs: parseInt(text.paragraphs) });
    
    if (data?.summary) {
      const newText = {...text, summary: data.summary};
      const updatedAllTexts = [newText, ...allTexts];

      setText(newText);
      setAllTexts(updatedAllTexts);

      localStorage.setItem('texts', JSON.stringify(updatedAllTexts));
    }
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        {/* FORM INPUT */}
        <form
          className="flex relative justify-center items-center gap-2"
          onSubmit={formSubmit}
        >
          <BsLink className="absolute left-0 my-2 ml-3" />

          <input
            type="url"
            placeholder="Enter URL"
            value={text.url}
            onChange={(e) => {setText({...text, url: e.target.value})}}
            required
            className="url-input peer"
          />

          <select
            name="paragraphs"
            id="paragrahs"
            className="relative paragraph-select peer"
            value={text.paragraphs}
            onChange={(e) => {setText({...text, paragraphs: e.target.value})}}
          >
            <option value="3" defaultValue="selected">3 Paragraphs</option>
            <option value="6">6 Paragraphs</option>
            <option value="9">9 Paragraphs</option>
          </select>

          <button
            type="submit"
            className="submit-btn w-full"
          >
            <BsSend className="absolute left-0 my-2 ml-3" />
          </button>
        </form>

        {/* HISTORY */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allTexts.map((text, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setText(text)}
              className="link-card">
              <div className="copy-btn">
                <BsClipboardPlus size={14} />
              </div>
              <p
                className="flex-1 font-satoshi text-blue-900 font-medium text-sm truncate">
                  {text.url}
              </p>
            </div>
          ))}
        </div>

        {/* REQUEST OUTPUT */}
        <div className="my-10 max-w-full flex justify-center items-center">
            { isFetching ? (
              <PiSpinnerGapBold />
            ) : error ? (
              <p
                className="font-inter font-bold text-black text-center">
                Sorry, that wan't supossed to happen... 
                <br />
                {error && ('error' in error ? (
                  <span className="font-satoshi font-normal text-gray-700">
                    {error.error}
                  </span>
                ) : 'message' in error ? (
                  <span className="font-satoshi font-normal text-gray-700">
                    {error.message}
                  </span>
                ) : null)}
                Please try again later
              </p>
            ) : ( 
              text.summary && (
                <div className="flex flex-col gap-2">
                  <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                    Text <span className="blue-gradient">Summary</span>
                  </h2>
                  <article className="summary-box">
                    <p className="font-inter font-medium text-sm text-gray-700">
                      {text.summary}
                    </p>
                  </article>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  )
}

export default Summarizer