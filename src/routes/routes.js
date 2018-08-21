import React from "react";
import { Route, Switch } from "react-router-dom";
import BucketComponent from "../modules/bucket/buckets/buckets";
import ObjectComponent from "../modules/bucket/objects/objects";
import MainModule from "../modules/main/main";
import CompareFacesComponent from "../modules/recognition/compare-faces/compare-faces";
import FaceComponent from "../modules/recognition/face/face";
import LabelComponent from "../modules/recognition/label/label";
import TextComponent from "../modules/recognition/text/text";

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ MainModule } />
      <Route exact path='/web' component={ MainModule } />
      <Route exact path='/web/recognition/compare-faces' component={ CompareFacesComponent } />
      <Route exact path='/web/recognition/face' component={ FaceComponent } />
      <Route exact path='/web/recognition/label' component={ LabelComponent } />
      <Route exact path='/web/recognition/text' component={ TextComponent } />

      <Route exact path='/bucket/buckets' component={ BucketComponent } />
      <Route exact path='/bucket/objects' component={ ObjectComponent } />
    </Switch>
  </main>
)

export default Main;