import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Clock, CalendarClock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Milestone } from '../../types';
import { cn } from '../../lib/utils';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  title: string;
}

const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones, title }) => {
  const sortedMilestones = [...milestones].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          <ul className="-mb-8">
            {sortedMilestones.map((milestone, index) => (
              <li key={milestone.id}>
                <div className="relative pb-8">
                  {index !== sortedMilestones.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-neutral-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={cn(
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                          milestone.completed
                            ? 'bg-success-100'
                            : 'bg-neutral-100'
                        )}
                      >
                        {milestone.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-success-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-neutral-500" />
                        )}
                      </span>
                    </div>
                    <div className="flex-1 pt-1.5">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-neutral-900">
                          {milestone.title}
                        </p>
                        <p
                          className={cn(
                            'text-sm',
                            milestone.completed
                              ? 'text-success-600'
                              : 'text-neutral-500'
                          )}
                        >
                          {format(new Date(milestone.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-neutral-500">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneTimeline;