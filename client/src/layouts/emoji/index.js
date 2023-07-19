// import React, { useState, useRef } from "react";
// // import { Picker } from "emoji-mart";
// // import ReactTextareaAutocomplete from "react-textarea-autocomplete";
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import "emoji-mart/dist/css/emoji-mart.css";
// const Emoji = () => {
//   const [newMessage, setNewMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const nameInputRef = useRef(null);

//   const toggleEmojiPicker = () => {
//     setShowEmojiPicker(!showEmojiPicker);
//     console.log("toggle", showEmojiPicker);
//   };

//   const addEmoji = (emoji) => {
//     const text = `${newMessage}${emoji.native}`;
//     setNewMessage(text);
//     setShowEmojiPicker(false);
//     console.log("add emoji", newMessage);
//     nameInputRef.current.focus();
//   };

//   const handleInput = (event) => {
//     setNewMessage(event.target.value);
//     console.log("handle input", newMessage);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div className="App">
//       <section className="chat-screen">
//         <footer className="chat-footer">
//           <form className="message-form">
//             <button
//               type="button"
//               className="toggle-emoji"
//               onClick={toggleEmojiPicker}
//             >
//               ^-^v
//             </button>
//             <input
//               type="text"
//               value={newMessage}
//               name="newMessage"
//               placeholder="Type your message and hit ENTER to send"
//               ref={nameInputRef}
//               onChange={handleInput}
//             />
//             <button onClick={handleSubmit}>send</button>
//             <div>
//               {showEmojiPicker ? (
//                 <Picker
//                   set="emojione"
//                   onSelect={addEmoji}
//                   title="Pick your emoji..."
//                   emoji="point_up"
//                   style={{
//                     position: "absolute",
//                     bottom: "90px",
//                     right: "20px"
//                   }}
//                 />
//               ) : null}
//             </div>
//           </form>
//           <ul>
//             <li>text here</li>
//           </ul>
//         </footer>
//       </section>
//     </div>
//   );
// };

// export default Emoji;

// import ArgonBox from 'components/ArgonBox';
// import { useArgonController } from 'context';
// import EmojiPicker from 'emoji-picker-react';
// import { useState } from 'react';

// function Emoji() {
//     const [controller] = useArgonController();
//     const { miniSidenav } = controller;
//     const [latestMessage, setLatestMessage] = useState('');
//     const onEmojiClick = (e) => {
//         const sym=e.unified.split('_');
//         let codesArray = [];
//         sym.forEach(el => codesArray.push('0x' + el));
//         let emoji = String.fromCodePoint(...codesArray);
//         if(latestMessage){
//         setLatestMessage(latestMessage+emoji);
//         }else{
//         setLatestMessage(emoji);
//         }
//         }
//         console.log(latestMessage);
//   return (
//     <>
//     <ArgonBox
//     sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
//       [breakpoints.up("xl")]: {
//         marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
//         transition: transitions.create(["margin-left", "margin-right"], {
//           easing: transitions.easing.easeInOut,
//           duration: transitions.duration.standard,
//         }),
//       },
//     })}
//   >
//     <div>
//       <EmojiPicker onClick={onEmojiClick} />
//     </div>
//     </ArgonBox>
//     </>
//   );
// }

// export default Emoji;

// import "./styles.css";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation
} from "emoji-picker-react";
import { useState } from "react";
import { Input } from "reactstrap";

export default function App() {
  const [selectedEmoji, setSelectedEmoji] = useState('');
const [latestMessage, setLatestMessage] = useState('');
  function onClick( emojiData, e) {
    setSelectedEmoji(emojiData.unified);
  }
  const onEmojiClick = (e) => {
            const sym=e.unified.split('_');
            let codesArray = [];
            sym.forEach(el => codesArray.push('0x' + el));
            let emoji = String.fromCodePoint(...codesArray);
            if(latestMessage){
            setLatestMessage(latestMessage+emoji);
            }else{
            setLatestMessage(emoji);
            }
            }
  return (
    <div className="App">
      <h2>Emoji Picker React 4 Demo</h2>
      <div className="show-emoji">
        Your selected Emoji is:
        {/* {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null} */}
        <Input type="text" value={latestMessage} onChange={(e)=>setLatestMessage(e.target.value)} />
      </div>

      <EmojiPicker
        onEmojiClick={onEmojiClick}
        autoFocusSearch={false}
        // theme={Theme.AUTO}
        // searchDisabled
        // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
        // height={350}
        // width="50%"
        // emojiVersion="0.6"
        // lazyLoadEmojis={true}
        // previewConfig={{
        //   defaultCaption: "Pick one!",
        //   defaultEmoji: "1f92a" // 🤪
        // }}
        // suggestedEmojisMode={SuggestionMode.RECENT}
        // skinTonesDisabled
        // searchPlaceHolder="Filter"
        // defaultSkinTone={SkinTones.MEDIUM}
        emojiStyle={EmojiStyle.NATIVE}
        // categories={[
        //   {
        //     name: "Fun and Games",
        //     category: Categories.ACTIVITIES
        //   },
        //   {
        //     name: "Smiles & Emotions",
        //     category: Categories.SMILEYS_PEOPLE
        //   },
        //   {
        //     name: "Flags",
        //     category: Categories.FLAGS
        //   },
        //   {
        //     name: "Yum Yum",
        //     category: Categories.FOOD_DRINK
        //   }
        // ]}
      />
    </div>
  );
}
