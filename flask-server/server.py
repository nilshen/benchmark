from flask import Flask
import pandas as pd
import requests
from io import StringIO

###combine two source files into one joined
score = requests.get('https://s3.amazonaws.com/simple-fractal-recruiting/score-records.csv')
company = requests.get('https://s3.amazonaws.com/simple-fractal-recruiting/companies.csv')
# print(scores.text)
score = pd.read_csv(StringIO(score.text))
company = pd.read_csv(StringIO(company.text))
joined = pd.merge(score, company[["company_id","fractal_index"]], on="company_id", how="left")
### I decided to add an additional column as overvall score which has same weight for communication & coding scores. 
### You will be surprised that overall percentile can be higher than both. refer to 914 for example.
joined["overall"] = joined["communication_score"] + joined["coding_score"]

### first try with local download. Ultimized with loading directly from aws to reduce server load (refer to above).
# score = 'score-records.csv'
# company = 'companies.csv'

app = Flask(__name__)

@app.route("/<int:id>")
def percentiles(id):
    candidate = joined.query("candidate_id == @id")

    ###filtered the data with same candidate title and similar company fractal index range
    candidate_title = candidate["title"].values[0]
    candidate_fractal = candidate["fractal_index"].values[0]
    filtered = joined.loc[(joined["title"] == candidate_title) & (joined["fractal_index"] > candidate_fractal - 0.15) & (joined["fractal_index"] < candidate_fractal + 0.15)]
    ## testing
    # print(candidate['fractal_index'])
    # print(candidate['title'])
    # print(filtered)

    ###calculate percentile based on filtered score for communication, coding, and overall
    com_filtered = filtered.sort_values(by=["communication_score"], ascending = 1)
    com_total = len(com_filtered["candidate_id"]) - 1 #needs to minus 1 total length excluding self.
    com_less_than = list(com_filtered["candidate_id"].values).index(id)

    com_percentile = str(round(float(com_less_than / com_total * 100), 1))
    
    ## testing
    # print()
    # print(com_less_than)
    # print(com_total)
    # print(com_percentile)

    coding_filtered = filtered.sort_values(by=["coding_score"], ascending = 1)
    coding_total = len(coding_filtered["candidate_id"]) - 1 #needs to minus 1  total length excluding self.
    coding_less_than = list(coding_filtered["candidate_id"].values).index(id)

    coding_percentile = str(round(float(coding_less_than / coding_total * 100), 1))
    
    ## testing
    # print()
    # print(coding_less_than)
    # print(coding_total)
    # print(coding_percentile)


    overall_filtered = filtered.sort_values(by=["overall"], ascending = 1)
    overall_total = len(overall_filtered["candidate_id"]) - 1 #needs to minus 1 total length excluding self.
    overall_less_than = list(overall_filtered["candidate_id"].values).index(id)

    overall_percentile = str(round(float(overall_less_than / overall_total * 100), 1))

    ##testing
    # print()
    # print(overall_less_than)
    # print(overall_total)
    # print(overall_percentile)

    # print(com_filtered)
    # print(coding_filtered)
    # print(overall_filtered)

    return [com_percentile+"%", coding_percentile+"%", overall_percentile+"%"]


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)

