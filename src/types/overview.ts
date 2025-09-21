// Types for overview container and filter panel
export type SubflowFilters = { [key: string]: string };

export interface FilterPanelProps {
  search: string;
  setSearch: (v: string) => void;
  department: string;
  setDepartment: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  crit: string;
  setCrit: (v: string) => void;
  teamleadSearch: string;
  setTeamleadSearch: (v: string) => void;
  departments: string[];
  locations: string[];
  criticality: any[];
  onClear: () => void;
  nameResults: string[];
  teamleadResults: string[];
  showNameDropdown: boolean;
  setShowNameDropdown: (v: boolean) => void;
  showTeamleadDropdown: boolean;
  setShowTeamleadDropdown: (v: boolean) => void;
  nameDropdownClosedByClick: any;
  teamleadDropdownClosedByClick: any;
  subflowNames: string[];
  subflowFilters: SubflowFilters;
  handleSubflowFilterChange: (subflow: string, value: string) => void;
}

export interface WorkflowOverviewProps {
  // Add fields as needed
}
