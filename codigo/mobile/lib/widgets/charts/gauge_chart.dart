import 'dart:math';

import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter/material.dart';

class GaugeChart extends StatelessWidget {
  final List<charts.Series> seriesList;
  final bool animate;
  final String chartTitle;
  final double value;
  GaugeChart({
    this.animate,
    this.seriesList,
    this.chartTitle,
    this.value,
  });

  /// Creates a [PieChart] with sample data and no transition.

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
              height: 200,
              width: 300,
              child: Stack(
                children: [
                  new charts.PieChart(
                    seriesList,
                    animate: animate,
                    // Configure the width of the pie slices to 30px. The remaining space in
                    // the chart will be left as a hole in the center. Adjust the start
                    // angle and the arc length of the pie so it resembles a gauge.
                    behaviors: [
                      new charts.ChartTitle(
                        chartTitle,
                        behaviorPosition: charts.BehaviorPosition.top,
                        titleOutsideJustification:
                            charts.OutsideJustification.middle,
                        titleStyleSpec: charts.TextStyleSpec(
                          fontFamily: 'Alatsi',
                          fontSize: 18,
                          color: charts.ColorUtil.fromDartColor(
                            Theme.of(context).accentColor,
                          ),
                        ),
                        innerPadding: 12,
                      ),
                    ],
                    defaultRenderer: new charts.ArcRendererConfig(
                        arcWidth: 30,
                        startAngle: 4 / 5 * pi,
                        arcLength: 7 / 5 * pi),
                  ),
                  Center(
                    child: Text(
                      value.toStringAsFixed(0),
                      style: TextStyle(
                        fontSize: 18,
                      ),
                    ),
                  )
                ],
              )),
        ),
      ),
    );
  }

  /// Create one series with sample hard coded data.
  static List<charts.Series<GaugeSegment, String>> _createSampleData() {
    const value = 40;
    final data = [
      new GaugeSegment(segment: 'Full', size: 180 - value, color: Colors.grey)
    ];

    if (value < 100) {
      data.insert(0,
          new GaugeSegment(segment: 'Green', size: value, color: Colors.green));
    } else if (value < 130) {
      data.insert(
          0,
          new GaugeSegment(
              segment: 'Yellow', size: value, color: Colors.yellow));
    } else if (value < 150) {
      data.insert(
          0,
          new GaugeSegment(
              segment: 'Orange', size: value, color: Colors.orange));
    } else {
      data.insert(
          0, new GaugeSegment(segment: 'Red', size: value, color: Colors.red));
    }

    return [
      new charts.Series<GaugeSegment, String>(
        id: 'Segments',
        domainFn: (GaugeSegment segment, _) => segment.segment,
        measureFn: (GaugeSegment segment, _) => segment.size,
        colorFn: (GaugeSegment segment, _) =>
            charts.ColorUtil.fromDartColor(segment.color),
        data: data,
      )
    ];
  }
}

/// Sample data type.
class GaugeSegment {
  final String segment;
  final int size;
  final Color color;

  GaugeSegment({this.segment, this.size, this.color});
}
