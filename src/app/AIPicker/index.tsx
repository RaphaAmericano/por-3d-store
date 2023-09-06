import CustomButton from "../CustomButton";

interface IProps {
  prompt: any;
  setPrompt: any;
  generatingImg: any;
  handleSubmit: any;
}
export default function AIPicker({ prompt, setPrompt, generatingImg, handleSubmit, }: IProps) {
  return <div className="aipicker-container">
    <textarea 
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
    />
        <div className="flex flex-wrap gap-3">
        {generatingImg ? <CustomButton 
            type="outline"
            title="Asking AI..."
            customStyles={"text-xs"}
        /> : (
            <>
            <CustomButton 
                type="outline"
                title="Asking AI..."
                customStyles={"text-xs"}
                handleClick={() => handleSubmit("logo")}
            />
            <CustomButton 
                type="filled"
                title="AI Logo"
                customStyles={"text-xs"}
                handleClick={() => handleSubmit("lfull")}
            />
            </>
        )}        

        </div>
    </div>;
}
