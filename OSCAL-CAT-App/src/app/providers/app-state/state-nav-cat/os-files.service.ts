import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Injectable({
    providedIn: 'root'
})
export class OsFileOperations extends KvServiceBase {
    session_id: string;




    public consoleLogFile(fileName) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            console.log('csv content', e.target.result);
        };
        reader.readAsDataURL(fileName);
    }

}