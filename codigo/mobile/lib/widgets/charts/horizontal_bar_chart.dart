import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:mobile/models/request.dart';

class HorizontalBarChart extends StatelessWidget {
  final List<charts.Series> seriesList;
  final bool animate;
  final String chartTitle;

  HorizontalBarChart({
    this.animate,
    this.seriesList,
    this.chartTitle,
  });

  @override
  Widget build(BuildContext context) {
    // For horizontal bar charts, set the [vertical] flag to false.
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            height: 200,
            width: 300,
            child: new charts.BarChart(
              seriesList,
              animate: animate,
              vertical: false,
              barRendererDecorator: new charts.BarLabelDecorator(
                insideLabelStyleSpec: new charts.TextStyleSpec(
                  color: charts.MaterialPalette.white,
                ),
                outsideLabelStyleSpec: new charts.TextStyleSpec(
                  color: charts.MaterialPalette.gray.shade900,
                ),
              ),

              behaviors: [
                new charts.ChartTitle(
                  chartTitle,
                  behaviorPosition: charts.BehaviorPosition.top,
                  titleOutsideJustification: charts.OutsideJustification.middle,
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
              // It is important when using both primary and secondary axes to choose
              // the same number of ticks for both sides to get the gridlines to line
              // up.
              domainAxis: new charts.OrdinalAxisSpec(
                renderSpec: charts.SmallTickRendererSpec(
                  labelStyle: charts.TextStyleSpec(
                    fontSize: 12,
                    color: charts.MaterialPalette.gray.shade600,
                  ),
                ),
              ),
              primaryMeasureAxis: new charts.NumericAxisSpec(
                renderSpec: new charts.NoneRenderSpec(),
              ),
            ),
          ),
        ),
      ),
    );
  }

  static String convertMillisecondsToSeconds(double milliseconds) {
    double seconds = milliseconds / 1000;
    String formater = 's';
    if (seconds > 60) {
      seconds = seconds / 60;
      formater = 'm';
    }
    print('${seconds.toStringAsFixed(2)}$formater'.replaceAll('.', ','));
    return '${seconds.toStringAsFixed(2)}$formater'.replaceAll('.', ',');
  }

  /// Create series list with multiple series

}

/// Sample ordinal data type.

