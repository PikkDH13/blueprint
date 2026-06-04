import os
import fitz  # PyMuPDF
import json

# Setup directories
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_JSON = os.path.join(SCRIPT_DIR, "search_index.json")

def build_static_index():
    indexed_files = []
    print("Starting index generation...")

    for file in os.listdir(SCRIPT_DIR):
        if file.endswith(".pdf"):
            file_path = os.path.join(SCRIPT_DIR, file)
            raw_size = os.path.getsize(file_path)
            
            try:
                print(f"Processing: {file}")
                doc = fitz.open(file_path)
                text = "".join([page.get_text() for page in doc])
                
                file_data = {
                    "name": file,
                    "content": text.lower(),
                    "rawText": text,
                    "size": f"{raw_size / 1024:.0f}KB",
                    "size_bytes": raw_size
                }
                indexed_files.append(file_data)
            except Exception as e:
                print(f"Failed to process {file}: {e}")

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(indexed_files, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully generated {OUTPUT_JSON} with {len(indexed_files)} files.")

if __name__ == "__main__":
    build_static_index()