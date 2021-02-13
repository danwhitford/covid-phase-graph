
curl --compressed -s -H -g \
    'content-type: application/json' \
    'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure=%7B"areaName":"areaName","date":"date","newCasesBySpecimenDate":"newCasesByPublishDate"%7D' \
    | jq \
    # | less
