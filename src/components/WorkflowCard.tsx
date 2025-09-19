import { Card } from '@mui/material';
import styles from './WorkflowCard.module.css';
import { initialAreas } from '../mockAreas';
import { subflowCards } from '../mockSubflowCards';
import { useNavigate } from 'react-router-dom';

export type StatusData = {
  completion: string[]; // checked step ids
  subflowId: string;
};

export type WorkflowData = {
  id: string;
  name: string;
  email: string;
  department: string;
  location: string;
  teamlead: string;
  exitDate: string;
  picture: string;
  statuses: StatusData[];
  subflows: any;
};

// Helper to determine traffic light color for subflows
function getSubflowTrafficLight(completion: string[], total: number): string {
  if (total === 0) return 'red';
  if (completion.length === 0) return 'red';
  const percent = completion.length / total;
  if (percent < 1) return 'yellow';
  return 'green';
}

export function WorkflowCard({ data, onNameClick, isTableRow = false, isLast = false }: { data: WorkflowData; onNameClick: () => void; isTableRow?: boolean; isLast?: boolean }) {
  const areaColumns = initialAreas;
  const navigate = useNavigate();
  // Dynamic area columns
  if (isTableRow) {
    return (
      <tr style={{ borderBottom: isLast ? 'none' : '1px solid #e0e0e0', background: '#fff', height: 64 }}>
        <td style={{ width: '22%', minWidth: 56, paddingLeft: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={data.picture} alt={data.name} style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', marginRight: 12, alignSelf: 'center' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 340, textAlign: 'center', height: 54 }}>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1976d2', paddingBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 340, textAlign: 'left', cursor: 'pointer' }} onClick={onNameClick}>{data.name}</span>
              <span style={{ fontSize: '0.85rem', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 340, marginRight: 8, textAlign: 'center' }}>{data.email}</span>
            </div>
          </div>
        </td>
        <td style={{ width: '14%', minWidth: 120, maxWidth: 420 }}>
          <span style={{ fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left', display: 'flex', alignItems: 'center', height: 54 }}>{data.department}</span>
        </td>
        <td style={{ width: '14%', minWidth: 120 }}>
          <span style={{ fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left', display: 'flex', alignItems: 'center', height: 54 }}>{data.location}</span>
        </td>
        <td style={{ width: '4%', minWidth: 60, textAlign: 'left' }}>
          {(() => {
            const today = new Date();
            const exit = new Date(data.exitDate);
            const diffDays = Math.ceil((exit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            let color = '#43a047';
            if (diffDays <= 14) color = '#e53935';
            else if (diffDays <= 30) color = '#fbc02d';
            return (
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start', width: 110, height: 28, borderRadius: 14, margin: '0 6px 0 0', verticalAlign: 'middle', fontSize: '1rem', fontWeight: 600, color: '#fff', background: color, textAlign: 'left', justifyItems: 'center' }}>
                <span style={{ width: '100%', textAlign: 'center' }}>{data.exitDate}</span>
              </span>
            );
          })()}
        </td>
        {areaColumns.map(area => {
          const status = data.statuses.find(s => {
            const subflow = subflowCards.find(card => card.id === s.subflowId);
            return subflow && subflow.areaId === area.id;
          });
          if (!status) {
            return (
              <td key={area.id} style={{ width: '9%', minWidth: 60, textAlign: 'center' }}>
                <span style={{ color: '#888' }}>–</span>
              </td>
            );
          }
          const subflow = subflowCards.find(card => card.id === status.subflowId);
          const totalSteps = subflow ? subflow.checkpointIds.length : 0;
          const color = getSubflowTrafficLight(status.completion, totalSteps);
          let bg = '#e53935';
          if (color === 'yellow') bg = '#fbc02d';
          if (color === 'green') bg = '#43a047';
          return (
            <td key={area.id} style={{ width: '9%', minWidth: 60, textAlign: 'center', cursor: 'pointer' }}
              onClick={() => navigate(`/checklist-detail/${status.subflowId}`, { state: { processId: data.id, completion: status.completion, subflowId: status.subflowId } })}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 22, borderRadius: '12px / 50%', fontSize: '0.95rem', fontWeight: 600, color: '#fff', background: bg }}>{`${status.completion.length}/${totalSteps}`}</span>
            </td>
          );
        })}
      </tr>
    );
  }
  return (
    <Card className={styles.tableRow} sx={{ m: 0, p: 0, boxShadow: 'none', borderRadius: 0, bgcolor: '#fff' }}>
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
      <span className={styles.exitDate}>
        {(() => {
          const today = new Date();
          const exit = new Date(data.exitDate);
          const diffDays = Math.ceil((exit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          let colorClass = styles.green;
          if (diffDays <= 14) colorClass = styles.red;
          else if (diffDays <= 30) colorClass = styles.yellow;
          return (
            <span className={`${styles.trafficlightDate} ${colorClass}`}>{data.exitDate}</span>
          );
        })()}
      </span>
      <div className={styles.statuses}>
        {areaColumns.map(area => {
          const status = data.statuses.find(s => {
            const subflow = subflowCards.find(card => card.id === s.subflowId);
            return subflow && subflow.areaId === area.id;
          });
          if (!status) {
            return (
              <div key={area.id} className={styles.status}>
                <span style={{ color: '#888' }}>–</span>
              </div>
            );
          }
          const subflow = subflowCards.find(card => card.id === status.subflowId);
          const totalSteps = subflow ? subflow.checkpointIds.length : 0;
          const color = getSubflowTrafficLight(status.completion, totalSteps);
          return (
            <div key={area.id} className={styles.status}>
              <span className={`${styles.trafficlight} ${styles[color]}`}>{`${status.completion.length}/${totalSteps}`}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
