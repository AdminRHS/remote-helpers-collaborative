import json
import os

def parse_tasks_by_profession():
    # Read the main tasks file
    with open('LLM tasks.json', 'r', encoding='utf-8') as f:
        tasks = json.load(f)

    # Create a dictionary to store tasks by profession
    tasks_by_profession = {}

    # Process each task
    for task in tasks:
        profession = task.get('Professions')
        if not profession:
            continue

        # Initialize profession entry if it doesn't exist
        if profession not in tasks_by_profession:
            tasks_by_profession[profession] = {
                'profession': profession,
                'department': task.get('Departments', ''),
                'tasks': []
            }

        # Transform task into our desired format
        formatted_task = {
            'task_name': task.get('Tasks', ''),
            'responsibilities': task.get('Responsibilities', ''),
            'objects': task.get('Objects', ''),
            'checklists': [item.strip() for item in task.get('Checklists', '').split('<br>')],
            'type': task.get('Types', ''),
            'parameters': [param.strip() for param in task.get('Parameters', '').split(',')],
            'tools': [tool.strip() for tool in task.get('Tools', '').split(',')],
            'complexity': task.get('Complexity', '')
        }

        # Add the formatted task to the profession's task list
        tasks_by_profession[profession]['tasks'].append(formatted_task)

    # Create output directory if it doesn't exist
    if not os.path.exists('tasks_by_profession'):
        os.makedirs('tasks_by_profession')

    # Write separate files for each profession
    for profession, data in tasks_by_profession.items():
        filename = f'tasks_by_profession/Tasks_{profession.replace(" ", "_")}.json'
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Created task files for {len(tasks_by_profession)} professions")
    return list(tasks_by_profession.keys())

if __name__ == '__main__':
    professions = parse_tasks_by_profession()
    print("\nProcessed tasks for the following professions:")
    for profession in sorted(professions):
        print(f"- {profession}") 