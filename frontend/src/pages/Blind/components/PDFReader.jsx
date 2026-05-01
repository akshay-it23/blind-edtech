import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileUp, PauseCircle, PlayCircle, RotateCcw, Type } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

const SAMPLE_TEXT =
	"Welcome to the accessible reader. Upload a PDF to preview it here, or paste text below and use the read aloud controls to listen to the content.";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFReader() {
	const [fileName, setFileName] = useState("No file selected");
	const [fileUrl, setFileUrl] = useState("");
	const [text, setText] = useState(SAMPLE_TEXT);
	const [extractedText, setExtractedText] = useState("");
	const [isLoadingPdf, setIsLoadingPdf] = useState(false);
	const [loadError, setLoadError] = useState("");
	const [isSpeaking, setIsSpeaking] = useState(false);

	const canSpeak = useMemo(() => typeof window !== "undefined" && "speechSynthesis" in window, []);

	useEffect(() => {
		return () => {
			if (fileUrl) {
				URL.revokeObjectURL(fileUrl);
			}
			if (canSpeak) {
				window.speechSynthesis.cancel();
			}
		};
	}, [canSpeak, fileUrl]);

	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setLoadError("");
		setExtractedText("");
		setIsLoadingPdf(true);

		if (fileUrl) {
			URL.revokeObjectURL(fileUrl);
		}

		const nextUrl = URL.createObjectURL(file);
		setFileName(file.name);
		setFileUrl(nextUrl);

		const reader = new FileReader();
		reader.onload = async () => {
			try {
				const arrayBuffer = reader.result;
				const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
				const pdf = await loadingTask.promise;
				let fullText = "";

				for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
					const page = await pdf.getPage(pageNumber);
					const content = await page.getTextContent();
					const pageText = content.items.map((item) => item.str).join(" ");
					fullText += `${pageText} \n`;
				}

				const trimmedText = fullText.trim();
				setExtractedText(trimmedText);
				setText(trimmedText || SAMPLE_TEXT);
			} catch (error) {
				console.error("Failed to read PDF", error);
				setLoadError("Could not read this PDF. Try another file or use the text box.");
			} finally {
				setIsLoadingPdf(false);
			}
		};
		reader.onerror = () => {
			setLoadError("Could not load the selected file.");
			setIsLoadingPdf(false);
		};
		reader.readAsArrayBuffer(file);
	};

	const speakText = () => {
		if (!canSpeak || !text.trim()) return;

		window.speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en-US";
		utterance.rate = 0.95;
		utterance.onstart = () => setIsSpeaking(true);
		utterance.onend = () => setIsSpeaking(false);
		utterance.onerror = () => setIsSpeaking(false);
		window.speechSynthesis.speak(utterance);
	};

	const speakPdf = () => {
		if (!extractedText.trim()) return;
		setText(extractedText);
		speakText();
	};

	const stopSpeaking = () => {
		if (!canSpeak) return;
		window.speechSynthesis.cancel();
		setIsSpeaking(false);
	};

	const resetReader = () => {
		setText(SAMPLE_TEXT);
		setFileName("No file selected");
		setExtractedText("");
		setLoadError("");
		setIsLoadingPdf(false);
		if (fileUrl) {
			URL.revokeObjectURL(fileUrl);
		}
		setFileUrl("");
	};

	return (
		<motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-4 py-8 text-white sm:px-6 lg:px-8"
    >
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
				<motion.section 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-8"
        >
					<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-3xl">
							<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
								<BookOpen className="h-4 w-4" />
								Blind Reader
							</div>
							<h1 className="text-4xl font-black tracking-tight sm:text-5xl">
								Read, preview, and listen in one place.
							</h1>
							<p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
								This page is built for high contrast and simple navigation. Upload a PDF to preview it, or paste text and use the read aloud controls below.
							</p>
						</div>

						<div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px] lg:grid-cols-1">
							<div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">File</p>
								<p className="mt-2 truncate text-lg font-semibold text-white">{fileName}</p>
							</div>
							<div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
								<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Speech</p>
								<p className={`mt-2 text-lg font-semibold ${isSpeaking ? "text-emerald-300" : "text-amber-300"}`}>
									{isSpeaking ? "Reading aloud" : "Ready"}
								</p>
							</div>
						</div>
					</div>
				</motion.section>

				{loadError ? (
					<motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
          >
						{loadError}
					</motion.div>
				) : null}

				<div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
					<motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 shadow-xl backdrop-blur-xl"
          >
						<div>
							<label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
								<FileUp className="h-4 w-4 text-cyan-300" />
								Upload PDF
							</label>
							<input
								type="file"
								accept="application/pdf"
								onChange={handleFileChange}
								className="block w-full cursor-pointer rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-cyan-400"
							/>
							<p className="mt-2 text-xs leading-5 text-slate-400">Use a PDF for preview. The spoken text below can be edited independently.</p>
						</div>

						<div>
							<label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
								<Type className="h-4 w-4 text-amber-300" />
								Reader text
							</label>
							<textarea
								value={text}
								onChange={(event) => setText(event.target.value)}
								rows={10}
								className="w-full rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
								placeholder="Paste text here to read aloud"
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
								type="button"
								onClick={speakText}
								className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
							>
								<PlayCircle className="h-4 w-4" />
								Read
							</motion.button>
							<motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
								type="button"
								onClick={stopSpeaking}
								className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
							>
								<PauseCircle className="h-4 w-4" />
								Stop
							</motion.button>
							<motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
								type="button"
								onClick={speakPdf}
								disabled={!extractedText || isLoadingPdf}
								className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<BookOpen className="h-4 w-4" />
								{isLoadingPdf ? "Reading PDF..." : "Read PDF"}
							</motion.button>
							<motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
								type="button"
								onClick={resetReader}
								className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
							>
								<RotateCcw className="h-4 w-4" />
								Reset
							</motion.button>
						</div>

						{isLoadingPdf ? (
							<p className="text-sm text-cyan-200 animate-pulse">Loading and extracting text from the PDF...</p>
						) : extractedText ? (
							<p className="text-sm text-emerald-300">PDF text extracted successfully. Use Read PDF to hear it aloud.</p>
						) : null}
					</motion.aside>

					<main className="grid gap-6">
						<motion.section 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl sm:p-6"
            >
              <AnimatePresence mode="wait">
                {fileUrl ? (
                  <motion.iframe
                    key={fileUrl}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    title="PDF preview"
                    src={fileUrl}
                    className="min-h-[70vh] w-full rounded-[1.25rem] border border-white/10 bg-white"
                  />
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex min-h-[70vh] items-center justify-center rounded-[1.25rem] border border-dashed border-white/15 bg-slate-950/40 p-8 text-center"
                  >
                    <div className="max-w-md">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/20">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">No PDF loaded yet</h2>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        Upload a PDF to preview it here. If you only need the audio reader, you can still paste text on the left and press Read.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
						</motion.section>
					</main>
				</div>
			</div>
		</motion.div>
	);
}

