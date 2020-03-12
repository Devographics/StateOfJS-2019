export const demographics = {
    country: {
        id: 'country',
        showDescription: true,
        query: `
            survey(survey: js) {
                demographics {
                    country {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                            }
                        }
                    }
                }
            }
        `
    },
    salary: {
        id: 'salary',
        showDescription: true,
        query: `
            survey(survey: js) {
                demographics {
                    salary {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                            }
                        }
                    }
                }
            }
        `
    },
    workExperience: {
        id: 'workExperience',
        showDescription: true,
        query: `
            survey(survey: js) {
                demographics {
                    workExperience {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                            }
                        }
                    }
                }
            }
        `
    },
    companySize: {
        id: 'companySize',
        showDescription: true,
        query: `
            survey(survey: js) {
                demographics {
                    companySize {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                            }
                        }
                    }
                }
            }
        `
    },
    source: {
        id: 'source',
        showDescription: true,
        query: `
            survey(survey: js) {
                demographics {
                    source {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                                entity {
                                    name
                                    homepage
                                    github {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    },
    gender: {
        id: 'gender',
        showDescription: true,
        showLegend: true,
        query: `
            survey(survey: js) {
                demographics {
                    gender {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                            }
                        }
                    }
                }
            }
        `
    },
    jobTitle: {
        id: 'jobTitle',
        showDescription: true,
        translateData: true,
        query: `
            survey(survey: js) {
                demographics {
                    jobTitle {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                            }
                        }
                    }
                }
            }
        `
    },
    cssProficiency: {
        id: 'cssProficiency',
        showDescription: true,
        showLegend: true,
        query: `
            survey(survey: js) {
                demographics {
                    cssProficiency {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                            }
                        }
                    }
                }
            }
        `
    },
    backendProficiency: {
        id: 'backendProficiency',
        showDescription: true,
        showLegend: true,
        query: `
            survey(survey: js) {
                demographics {
                    backendProficiency {
                        year(year: 2019) {
                            year
                            total
                            completion {
                                percentage
                                count
                            }
                            buckets {
                                id
                                count
                                percentage
                            }
                        }
                    }
                }
            }
        `
    }
}
