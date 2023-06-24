import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-kheader",
  templateUrl: "./kheader.component.html",
  styleUrls: ["./kheader.component.scss"],
})
export class KheaderComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  headerColor: string = "tertiary";

  constructor() {}

  ngOnInit() {}
}
