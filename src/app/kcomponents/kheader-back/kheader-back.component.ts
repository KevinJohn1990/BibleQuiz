import { Component, OnInit, Input } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-kheader-back",
  templateUrl: "./kheader-back.component.html",
  styleUrls: ["./kheader-back.component.scss"],
})
export class KheaderBackComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  headerColor: string = "tertiary";
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  popScreen() {
    this.navCtrl.back();
  }
}
