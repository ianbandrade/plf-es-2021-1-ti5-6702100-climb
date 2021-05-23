/// Simple pie chart example.
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class SimplePieChart extends StatelessWidget {
  final List<charts.Series> seriesList;
  final bool animate;
  final String charTitle;

  SimplePieChart({
    this.animate,
    this.seriesList,
    this.charTitle,
  });

  @override
  Widget build(BuildContext context) {
    bool hasData = true;
    seriesList.last.data.forEach((element) {
      print(element.quantity);
      if (int.parse(element.quantity) == 0) {
        hasData = false;
      }
    });

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            height: 200,
            width: 300,
            child: hasData
                ? new charts.PieChart(
                    seriesList,
                    animate: animate,
                    behaviors: [
                      new charts.ChartTitle(
                        charTitle,
                        behaviorPosition: charts.BehaviorPosition.top,
                        titleOutsideJustification:
                            charts.OutsideJustification.middleDrawArea,
                        titleStyleSpec: charts.TextStyleSpec(
                          fontFamily: 'Alatsi',
                          fontSize: 18,
                          color: charts.ColorUtil.fromDartColor(
                            Theme.of(context).accentColor,
                          ),
                        ),
                        innerPadding: 12,
                      ),
                      new charts.DatumLegend(
                        position: charts.BehaviorPosition.end,
                        horizontalFirst: false,
                        cellPadding:
                            new EdgeInsets.only(right: 4.0, bottom: 4.0),
                        showMeasures: true,
                        legendDefaultMeasure:
                            charts.LegendDefaultMeasure.firstValue,
                        measureFormatter: (num value) {
                          NumberFormat formater =
                              NumberFormat.compactLong(locale: 'pt-BR');
                          return formater.format(value);
                        },
                      ),
                    ],
                  )
                : Center(
                    child: Text('Nenhum dado ainda'),
                  ),
          ),
        ),
      ),
    );
  }

  /// Create one series with sample hard coded data.

}
