import { DatePipe } from '@angular/common'
import { Injectable } from '@angular/core'

@Injectable()
export class Utils {
    constructor(private datePipe: DatePipe) { }
    
    convertToDateFormatStringFromArray(array: any, key: string, stringFormat: string){
        return array.map((value:any) => {
            let valueKey = value[key]
            let { ...other } = value
            return {
                ...other,
                [key]: this.datePipe.transform(new Date(valueKey), stringFormat)
            }
        })
    }
}