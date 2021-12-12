import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-time-display',
    template: ''
})
export class TimeDisplayStubComponent {
    @Input() time: number;
    @Input() showHundriths: boolean;
    @Input() canSetTime: boolean;

    @Output() setTime = new EventEmitter<number>();
}

@Component({
    selector: 'app-timer-controls',
    template: ''
})
export class TimerControlsStubComponent {
    @Input() timerActive: boolean;
}

