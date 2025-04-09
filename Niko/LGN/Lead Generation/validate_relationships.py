import json
import os
from typing import Dict, List, Any

class LeadGenValidator:
    def __init__(self):
        self.components = {}
        self.config = {}
        self.load_files()

    def load_files(self):
        """Load all JSON files from the Lead Generation directory"""
        try:
            # Load configuration
            with open('config.json', 'r', encoding='utf-8') as f:
                self.config = json.load(f)

            # Load all component files
            for filename in os.listdir('.'):
                if filename.startswith('lead_gen_') and filename.endswith('.json'):
                    component_name = filename[9:-5]  # Remove 'lead_gen_' and '.json'
                    with open(filename, 'r', encoding='utf-8') as f:
                        self.components[component_name] = json.load(f)

        except Exception as e:
            print(f"Error loading files: {str(e)}")
            raise

    def validate_task_workflow(self) -> List[str]:
        """Validate task workflow relationships"""
        errors = []
        workflow = self.config['component_relationships']['task_workflow']
        tasks_data = self.components.get('tasks', {}).get('data', [])

        # Validate sequence
        for phase in workflow['sequence']:
            phase_tasks = [t for t in tasks_data if t.get('phase') == phase]
            if not phase_tasks:
                errors.append(f"No tasks found for phase: {phase}")

        # Validate dependencies
        for phase, deps in workflow['dependencies'].items():
            for dep in deps:
                if dep not in workflow['sequence']:
                    errors.append(f"Invalid dependency {dep} for phase {phase}")

        return errors

    def validate_tool_integration(self) -> List[str]:
        """Validate tool integration settings"""
        errors = []
        tools_data = self.components.get('tools', {}).get('data', [])
        integration_points = self.config['integration_points']

        for tool, settings in integration_points.items():
            tool_exists = any(t.get('name') == tool for t in tools_data)
            if not tool_exists:
                errors.append(f"Tool {tool} not found in tools data")

            # Validate sync settings
            if 'data_sync' in settings:
                for sync_type in settings['data_sync']:
                    if not any(t.get('sync_capabilities', []).count(sync_type) for t in tools_data if t.get('name') == tool):
                        errors.append(f"Sync capability {sync_type} not supported by {tool}")

        return errors

    def validate_data_flow(self) -> List[str]:
        """Validate data flow configurations"""
        errors = []
        data_flow = self.config['component_relationships']['data_flow']

        # Validate input sources
        for source in data_flow['input_sources']:
            if source not in self.config['integration_points']:
                errors.append(f"Input source {source} not configured in integration points")

        # Validate processing steps
        tasks_data = self.components.get('tasks', {}).get('data', [])
        for step in data_flow['processing_steps']:
            if not any(t.get('process_type') == step for t in tasks_data):
                errors.append(f"Processing step {step} not found in tasks")

        return errors

    def validate_security_compliance(self) -> List[str]:
        """Validate security and compliance settings"""
        errors = []
        security = self.config['security']

        # Validate encryption
        if not security.get('data_encryption'):
            errors.append("Data encryption is not enabled")

        # Validate access control
        access_control = security.get('access_control', {})
        if not access_control.get('role_based'):
            errors.append("Role-based access control is not enabled")

        # Validate compliance settings
        compliance = security.get('compliance', {})
        required_compliance = ['gdpr', 'ccpa']
        for req in required_compliance:
            if not compliance.get(req):
                errors.append(f"{req.upper()} compliance is not enabled")

        return errors

    def run_validation(self) -> Dict[str, List[str]]:
        """Run all validations and return results"""
        return {
            'task_workflow': self.validate_task_workflow(),
            'tool_integration': self.validate_tool_integration(),
            'data_flow': self.validate_data_flow(),
            'security_compliance': self.validate_security_compliance()
        }

def main():
    validator = LeadGenValidator()
    results = validator.run_validation()
    
    print("\nLead Generation System Validation Results:")
    print("=========================================")
    
    all_valid = True
    for category, errors in results.items():
        print(f"\n{category.replace('_', ' ').title()}:")
        if errors:
            all_valid = False
            for error in errors:
                print(f"❌ {error}")
        else:
            print("✓ All validations passed")
    
    if all_valid:
        print("\n✅ All system validations passed successfully!")
    else:
        print("\n⚠️ Some validations failed. Please review the errors above.")

if __name__ == '__main__':
    main() 