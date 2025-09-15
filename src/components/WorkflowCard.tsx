import styles from './WorkflowCard.module.css';
import { Card } from '@mui/material';

export type StatusColor = 'red' | 'yellow' | 'green';
export type SubflowStatus = {
  label: string;
  color: StatusColor;
  completion: string;
};

export type WorkflowData = {
  id: string;
  name: string;
  email: string;
  department: string;
  location: string;
  exitDate: string;
  dueDate: string;
  picture: string;
  statuses: SubflowStatus[];
  subflows: any;
};

export function WorkflowCard({ data, onNameClick }: { data: WorkflowData; onNameClick: () => void }) {
  const subflowLabels = ['HR', 'IT', 'Finance', 'Team'];
  return (
    <Card className={styles.tableRow}>
      <div className={styles.employee}>
        <img src={data.picture} alt={data.name} className={styles.avatar} />
        <div className={styles.nameEmail}>
          <span className={styles.name} onClick={onNameClick}>
            {data.name}
          </span>
          <span className={styles.email}>{data.email}</span>
        </div>
      </div>
      <span className={styles.department}>{data.department}</span>
      <span className={styles.location}>{data.location}</span>
      <span className={styles.exitDate}>{data.exitDate}</span>
      <div className={styles.statuses}>
        {subflowLabels.map((label, idx) => {
          const sf = data.statuses[idx] || { color: 'red', completion: '0/0' };
          return (
            <div key={label} className={styles.status}>
              <span className={styles.statusLabel}>{label}</span>
              <span className={`${styles.trafficlight} ${styles[sf.color]}`}></span>
              <span className={styles.completion}>{sf.completion}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
