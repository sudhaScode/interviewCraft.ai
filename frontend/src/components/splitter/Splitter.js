import React from 'react';
import { useSelector } from 'react-redux';
import Split from 'react-split';
import './Splitter.css';
import LeftPaneMenu from '../LeftPaneMenu';
import ChatBot from '../chatinterface/ChatBot';
import Resume from '../Resume';
import PromptsMenu from '../PromptsMenu';

// Memoize the PromptsMenu component to avoid re-rendering
const MemoizedPromptsMenu = React.memo(PromptsMenu);

function Splitter() {
    const isLogin = useSelector(state => state.flow.isLogin);
    const isUploaded = useSelector(state => state.flow.isUploaded);

    return (
        <>
            <Split className="split" gutterAlign="end" id="splitter">
                <div className="left-pane">
                    <LeftPaneMenu />
                </div>
                <div className="right-pane">
                    <ChatBot />
                </div>
            </Split>

            {/* Conditional rendering based on screen width */}
            <div id="normal-interface">
                <ChatBot />
                {isUploaded && <MemoizedPromptsMenu />}
            </div>
        </>
    );
}

export default Splitter;
