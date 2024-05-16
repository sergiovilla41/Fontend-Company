import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import {
  ItemNewValue,
  ItemObject,
  PropertiesList,
} from '../../../../store/interfaces/common-interface';

@Component({
  standalone: true,
  selector: 'simem-dropdown-form',
  templateUrl: './dropdown-form.component.html',
  styleUrl: './dropdown-form.component.scss',
  imports: [DropdownModule, CommonModule, FormsModule],
})
export class DropdownFormComponent implements OnChanges {
  @Input() itemObject: ItemObject = {
    itemSelected: '',
    name: '',
    items: [],
  };
  @Input() disable: boolean = false;
  @Input() requiered: boolean = false;
  @Input() showClear: boolean = false;
  @Output() dropDownNewValue = new EventEmitter<any>();
  selectedItem: PropertiesList = {
    name: '',
    code: '',
    dataType: '',
    description: '',
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disable']) {
      if (changes['disable'].currentValue === true) {
        this.selectedItem = {
          name: 'Selecciona',
          code: 'Selecciona',
          dataType: '',
          description: '',
        };
      }
    }

    if (changes['itemObject']) {
      if (
        typeof this.itemObject.itemSelected === 'undefined' ||
        this.itemObject.itemSelected === null
      )
        return;
      if (this.itemObject.itemSelected.toString().length > 0) {
        this.selectedItem = this.itemObject.items.filter(
          (item) => item.code === this.itemObject.itemSelected.toString()
        )[0];
      }
    }
  }

  onChange(_newValue: PropertiesList) {
    let newValue: ItemNewValue = {
      value: _newValue !== null ? _newValue.code : null,
      name: this.itemObject.name,
    };
    this.dropDownNewValue.emit(newValue);
  }
}
