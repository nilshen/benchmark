from flask import Flask, jsonify
import pandas as pd

###combine two source files into one joined
score = 'score-records.csv'
company = 'companies.csv'
score = pd.read_csv(score)
company = pd.read_csv(company)
joined = pd.merge(score, company[["company_id","fractal_index"]], on="company_id", how="left")
# print(joined)


app = Flask(__name__)

# @app.route("/")
# def home():
#     # if request.method == 'POST':
#         # id = request.form['id']
#     return [coding_percentile, com_percentile]

# @app.route("/<int:id>")
# def percentiles(id):

@app.route("/<int:id>")
def percentiles(id):
    search_id = id
    candidate = joined.query("candidate_id == @search_id")

    ###filtered the data with same candidate title and similar company fractal index range
    candidate_title = candidate["title"].values[0]
    candidate_fractal = candidate["fractal_index"].values[0]
    filtered = joined.loc[(joined["title"] == candidate_title) & (joined["fractal_index"] > candidate_fractal - 0.15) & (joined["fractal_index"] < candidate_fractal + 0.15)]
    # print(candidate['fractal_index'])
    # print(candidate['title'])
    # print(filtered)


    ###alternative way to calculate percentile based on filtered data
    com_filtered = filtered.sort_values(by=["communication_score"], ascending = 1)
    com_total = len(com_filtered["candidate_id"]) - 1 #needs to minus 1 because total length excluding self.
    com_less_than = list(com_filtered["candidate_id"].values).index(id)

    com_percentile = str(round(float(com_less_than / com_total * 100), 1))

    # print()
    # print(com_less_than)
    # print(com_total)
    # print(com_percentile)

    coding_filtered = filtered.sort_values(by=["coding_score"], ascending = 1)
    coding_total = len(coding_filtered["candidate_id"]) - 1 #needs to minus 1 because total length excluding self.
    coding_less_than = list(coding_filtered["candidate_id"].values).index(id)

    coding_percentile = str(round(float(coding_less_than / coding_total * 100), 1))
    # print()
    # print(coding_less_than)
    # print(coding_total)
    # print(coding_percentile)

    # print(com_filtered)
    # print(coding_filtered)

    return [com_percentile+'%', coding_percentile+'%']


if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5000)

