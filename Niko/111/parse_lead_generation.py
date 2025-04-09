import pandas as pd
import json
import os

def parse_lead_generation_xls():
    # Create Lead Generation directory if it doesn't exist
    if not os.path.exists('Lead Generation'):
        os.makedirs('Lead Generation')

    # Read the Excel file
    try:
        # Read all sheets from the Excel file
        excel_file = pd.ExcelFile('Lead generator LLM.xlsx')
        
        # Process each sheet
        for sheet_name in excel_file.sheet_names:
            # Read the sheet
            df = pd.read_excel(excel_file, sheet_name=sheet_name)
            
            # Convert to JSON structure
            json_data = {
                "sheet_name": sheet_name,
                "data": json.loads(df.to_json(orient='records', date_format='iso'))
            }
            
            # Create filename based on sheet name
            filename = f'Lead Generation/lead_gen_{sheet_name.lower().replace(" ", "_")}.json'
            
            # Save to JSON file
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, indent=4, ensure_ascii=False)
            
            print(f"Created JSON file for sheet: {sheet_name}")
            
        # Create an index file
        index_data = {
            "source_file": "Lead generator LLM.xlsx",
            "sheets_processed": excel_file.sheet_names,
            "files_created": [f"lead_gen_{sheet.lower().replace(' ', '_')}.json" for sheet in excel_file.sheet_names]
        }
        
        with open('Lead Generation/index.json', 'w', encoding='utf-8') as f:
            json.dump(index_data, f, indent=4, ensure_ascii=False)
            
        print("\nCreated index file with overview of all processed sheets")
        
    except Exception as e:
        print(f"Error processing Excel file: {str(e)}")
        return False
        
    return True

if __name__ == '__main__':
    print("Starting to parse Lead Generation Excel file...")
    success = parse_lead_generation_xls()
    if success:
        print("\nSuccessfully completed parsing Lead Generation data")
    else:
        print("\nFailed to parse Lead Generation data") 