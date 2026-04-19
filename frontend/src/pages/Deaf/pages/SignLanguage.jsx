import { useState } from "react";

import Sidebar from "../components/Sidebar";
import SignLanguageDetection from "../components/SignLangDetection";
import SignLanguageTranslator from "../components/SignLanguageTranslator";
import SignLanguageDictionary from "../components/SignLanguageDictionary";

const SignLanguage = () => {
const [activeTab, setActiveTab] = useState("dictionary"); // stores current tab

return (
<div style={{ display: "flex" }}> <Sidebar /> {/* left navigation */}


  <div style={{ flex: 1, padding: "20px" }}>
    <h1>Sign Language</h1>

    {/* tab buttons */}
    <button onClick={() => setActiveTab("dictionary")}>Dictionary</button>
    <button onClick={() => setActiveTab("translator")}>Translator</button>
    <button onClick={() => setActiveTab("fingerspelling")}>Fingerspelling</button>

    {/* render components */}
    {activeTab === "dictionary" && <SignLanguageDictionary />}
    {activeTab === "translator" && <SignLanguageTranslator />}
    {activeTab === "fingerspelling" && <SignLanguageDetection />}
  </div>
</div>

);
};

export default SignLanguage;
