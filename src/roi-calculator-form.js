import { LitElement, html, css } from 'lit';

export class RoiCalculatorForm extends LitElement {
  static properties = {
    // Form data
    platform: { type: String },
    operationalSatisfaction: { type: String },
    backlogEfficiency: { type: String },
    challenges: { type: Array },
    roadmapClarity: { type: String },
    name: { type: String },
    email: { type: String },
    jobTitle: { type: String },
    companyName: { type: String },
    // Form state
    formSubmitted: { type: Boolean },
    formErrors: { type: Object },
    // Scoring
    totalScore: { type: Number },
    showScore: { type: Boolean },
    meetingRequested: { type: Boolean },
    // CSRF token
    csrfToken: { type: String }
  };

  constructor() {
    super();
    // Initialize properties
    this.platform = '';
    this.operationalSatisfaction = '';
    this.backlogEfficiency = '';
    this.challenges = [];
    this.roadmapClarity = '';
    this.name = '';
    this.email = '';
    this.jobTitle = '';
    this.companyName = '';
    this.formSubmitted = false;
    this.formErrors = {};
    // Initialize scoring properties
    this.totalScore = 0;
    this.showScore = false;
    this.meetingRequested = false;
    // Initialize CSRF token as empty, will be fetched from server
    this.csrfToken = '';
    // Fetch CSRF token from server
    this._fetchCsrfToken();
  }

  // Fetch CSRF token from server
  async _fetchCsrfToken() {
    try {
      const response = await fetch('/FormHandler.php', {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.csrfToken = data.csrf_token;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  }

  // Scoring methods
  // For platform, we just store the text value, no scoring needed
  _getPlatformValue() {
    return this.platform;
  }

  _getOperationalSatisfactionScore() {
    const scores = {
      'Very unhappy': 0.00,
      'Unhappy': 0.75,
      'Neutral': 1.5,
      'Happy': 2.25,
      'Very happy': 3.0
    };
    return scores[this.operationalSatisfaction] || 0;
  }

  _getBacklogEfficiencyScore() {
    const scores = {
      'Very unhappy': 0.00,
      'Unhappy': 0.75,
      'Neutral': 1.5,
      'Happy': 2.25,
      'Very happy': 3.0
    };
    return scores[this.backlogEfficiency] || 0;
  }

  _getChallengesScore() {
    // For challenges, the score is max 3 points, with 1 point deducted per challenge selected
    return Math.max(0, 3 - this.challenges.length);
  }

  _getRoadmapClarityScore() {
    const scores = {
      'Yes': 2.0,
      'Somewhat': 1.0,
      'No': 0.00
    };
    return scores[this.roadmapClarity] || 0;
  }

  _calculateTotalScore() {
    const operationalScore = this._getOperationalSatisfactionScore();
    const backlogScore = this._getBacklogEfficiencyScore();
    const challengesScore = this._getChallengesScore();
    const roadmapScore = this._getRoadmapClarityScore();

    // Calculate raw total score
    const rawScore = operationalScore + backlogScore + challengesScore + roadmapScore;

    // Apply rounding rules
    // 1. If score is 0, return 1
    if (rawScore <= 0) {
      return 1;
    }

    // 2. For other scores, round up if decimal part > 0.8, otherwise round down
    const decimalPart = rawScore - Math.floor(rawScore);
    if (decimalPart > 0.8) {
      return Math.min(10, Math.ceil(rawScore));
    } else {
      return Math.max(1, Math.min(10, Math.floor(rawScore)));
    }
  }

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    select, input[type="text"], input[type="email"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 16px;
    }

    .radio-group, .checkbox-group {
      margin-top: 8px;
    }

    .radio-option, .checkbox-option {
      display: block;
      margin-bottom: 8px;
    }

    .error-message {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }

    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-right: 10px;
    }

    button:hover {
      background-color: #45a049;
    }

    .success-message {
      color: green;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .score-container {
      background-color: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
    }

    .score-title {
      font-size: 18px;
      margin-bottom: 10px;
      color: #333;
    }

    .score-value {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .score-value-red {
      color: #FF0000;
    }

    .score-value-amber {
      color: #FFA500;
    }

    .score-value-yellow {
      color: #FFFF00;
    }

    .score-value-green {
      color: #4CAF50;
    }

    .score-description {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }

    .request-meeting-button {
      background-color: #2196F3;
    }

    .request-meeting-button:hover {
      background-color: #0b7dda;
    }

    .meeting-requested-message {
      color: #2196F3;
      font-weight: bold;
      margin-top: 10px;
    }

    .score-slider-container {
      width: 100%;
      height: 30px;
      margin: 20px 0;
      position: relative;
      background: linear-gradient(to right, #FF0000, #FFA500, #FFFF00, #4CAF50);
      border-radius: 15px;
    }

    .score-marker {
      position: absolute;
      top: -10px;
      width: 10px;
      height: 50px;
      background-color: #333;
      border-radius: 5px;
      transform: translateX(-50%);
    }

  `;

  render() {
    return html`
      <div class="roi-calculator-form">
        <h2>ROI Calculator Form</h2>

        ${this.formSubmitted ? 
          html`
            ${this.showScore ? 
              html`
                <div class="score-container">
                  <div class="score-title">Your current health score</div>
                  <div class="score-value ${this._getScoreColorClass()}">${this.totalScore}/10</div>
                  <div class="score-description">
                    ${this.totalScore >= 7 ? 
                      'Your score indicates a low opportunity for ROI improvement!' : 
                      this.totalScore >= 4 ? 
                        'Your score indicates a moderate opportunity for ROI improvement.' : 
                        'Your score indicates a significant opportunity for ROI improvement.'}
                  </div>

                  <div class="score-slider-container">
                    <div class="score-marker" style="left: ${this._getScorePercentage()}%">
                    </div>
                  </div>

                  ${this.meetingRequested ? 
                    html`<div class="meeting-requested-message">Thank you! We'll contact you soon to schedule a meeting.</div>` : 
                    html`<button class="request-meeting-button" @click=${this._handleRequestMeeting}>Request Meeting</button>`
                  }
                </div>
              ` : ''
            }
          ` :
          html`
            <form @submit=${this._handleSubmit}>
              <!-- Commerce Platform -->
              <div class="form-group">
                <label for="platform">What is your commerce platform?</label>
                <select id="platform" @change=${this._handlePlatformChange} .value=${this.platform}>
                  <option value="" disabled selected>Select your platform</option>
                  <option value="Shopify Starter">Shopify Starter</option>
                  <option value="Shopify Basic">Shopify Basic</option>
                  <option value="Standard Shopify">Standard Shopify</option>
                  <option value="Shopify Advanced">Shopify Advanced</option>
                  <option value="Shopify Plus">Shopify Plus</option>
                  <option value="Magento Open Source">Magento Open Source</option>
                  <option value="Adobe Commerce Cloud">Adobe Commerce Cloud</option>
                  <option value="Adobe Commerce On-Prem">Adobe Commerce On-Prem</option>
                  <option value="BigCommerce">BigCommerce</option>
                  <option value="WordPress (WooCommerce)">WordPress (WooCommerce)</option>
                  <option value="Other">Other</option>
                </select>
                ${this.formErrors.platform ? html`<div class="error-message">${this.formErrors.platform}</div>` : ''}
              </div>

              <!-- Operational Support Satisfaction -->
              <div class="form-group">
                <label>How happy are you with the quality of your operational support?</label>
                <div class="radio-group">
                  ${['Very unhappy', 'Unhappy', 'Neutral', 'Happy', 'Very happy'].map(option => html`
                    <label class="radio-option">
                      <input type="radio" name="operationalSatisfaction" value="${option}" 
                        ?checked=${this.operationalSatisfaction === option}
                        @change=${this._handleOperationalSatisfactionChange}>
                      ${option}
                    </label>
                  `)}
                </div>
                ${this.formErrors.operationalSatisfaction ? html`<div class="error-message">${this.formErrors.operationalSatisfaction}</div>` : ''}
              </div>

              <!-- Backlog Efficiency Satisfaction -->
              <div class="form-group">
                <label>How happy are you with your backlog efficiency?</label>
                <div class="radio-group">
                  ${['Very unhappy', 'Unhappy', 'Neutral', 'Happy', 'Very happy'].map(option => html`
                    <label class="radio-option">
                      <input type="radio" name="backlogEfficiency" value="${option}" 
                        ?checked=${this.backlogEfficiency === option}
                        @change=${this._handleBacklogEfficiencyChange}>
                      ${option}
                    </label>
                  `)}
                </div>
                ${this.formErrors.backlogEfficiency ? html`<div class="error-message">${this.formErrors.backlogEfficiency}</div>` : ''}
              </div>

              <!-- Challenges -->
              <div class="form-group">
                <label>What are the biggest challenges you face in your role? (select up to 3)</label>
                <div class="checkbox-group">
                  ${['Development delays', 'Performance issues', 'Integration gaps', 'Platform limits', 'Unclear roadmap', 'Skills gap'].map(option => html`
                    <label class="checkbox-option">
                      <input type="checkbox" value="${option}" 
                        ?checked=${this.challenges.includes(option)}
                        @change=${this._handleChallengesChange}>
                      ${option}
                    </label>
                  `)}
                </div>
                ${this.formErrors.challenges ? html`<div class="error-message">${this.formErrors.challenges}</div>` : ''}
              </div>

              <!-- Roadmap Clarity -->
              <div class="form-group">
                <label>Do you have clear project roadmaps?</label>
                <div class="radio-group">
                  ${['Yes', 'Somewhat', 'No'].map(option => html`
                    <label class="radio-option">
                      <input type="radio" name="roadmapClarity" value="${option}" 
                        ?checked=${this.roadmapClarity === option}
                        @change=${this._handleRoadmapClarityChange}>
                      ${option}
                    </label>
                  `)}
                </div>
                ${this.formErrors.roadmapClarity ? html`<div class="error-message">${this.formErrors.roadmapClarity}</div>` : ''}
              </div>

              <!-- Contact Details -->
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" .value=${this.name} @input=${this._handleNameChange}>
                ${this.formErrors.name ? html`<div class="error-message">${this.formErrors.name}</div>` : ''}
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" .value=${this.email} @input=${this._handleEmailChange}>
                ${this.formErrors.email ? html`<div class="error-message">${this.formErrors.email}</div>` : ''}
              </div>

              <div class="form-group">
                <label for="jobTitle">Job Title</label>
                <input type="text" id="jobTitle" .value=${this.jobTitle} @input=${this._handleJobTitleChange}>
                ${this.formErrors.jobTitle ? html`<div class="error-message">${this.formErrors.jobTitle}</div>` : ''}
              </div>

              <div class="form-group">
                <label for="companyName">Company Name</label>
                <input type="text" id="companyName" .value=${this.companyName} @input=${this._handleCompanyNameChange}>
                ${this.formErrors.companyName ? html`<div class="error-message">${this.formErrors.companyName}</div>` : ''}
              </div>

              <button type="submit">Submit</button>
            </form>
          `
        }
      </div>
    `;
  }

  // Event handlers
  _handlePlatformChange(e) {
    this.platform = e.target.value;
  }

  _handleOperationalSatisfactionChange(e) {
    this.operationalSatisfaction = e.target.value;
  }

  _handleBacklogEfficiencyChange(e) {
    this.backlogEfficiency = e.target.value;
  }

  _handleChallengesChange(e) {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add to array if not already there and if less than 3 items are selected
      if (!this.challenges.includes(value)) {
        if (this.challenges.length < 3) {
          this.challenges = [...this.challenges, value];
        } else {
          // If already 3 items, uncheck the checkbox
          e.target.checked = false;
          // Update the error message
          this.formErrors = {
            ...this.formErrors,
            challenges: 'You can select a maximum of 3 challenges'
          };
          // Clear the error message after 3 seconds
          setTimeout(() => {
            this.formErrors = {
              ...this.formErrors,
              challenges: ''
            };
          }, 3000);
        }
      }
    } else {
      // Remove from array
      this.challenges = this.challenges.filter(item => item !== value);
    }
  }

  _handleRoadmapClarityChange(e) {
    this.roadmapClarity = e.target.value;
  }

  _handleNameChange(e) {
    this.name = e.target.value;
  }

  _handleEmailChange(e) {
    this.email = e.target.value;
  }

  _handleJobTitleChange(e) {
    this.jobTitle = e.target.value;
  }

  _handleCompanyNameChange(e) {
    this.companyName = e.target.value;
  }

  _handleSubmit(e) {
    e.preventDefault();

    // Validate form
    const errors = {};

    if (!this.platform) {
      errors.platform = 'Please select your commerce platform';
    }

    if (!this.operationalSatisfaction) {
      errors.operationalSatisfaction = 'Please select your satisfaction level';
    }

    if (!this.backlogEfficiency) {
      errors.backlogEfficiency = 'Please select your efficiency level';
    }

    if (this.challenges.length === 0) {
      errors.challenges = 'Please select at least one challenge';
    }

    if (!this.roadmapClarity) {
      errors.roadmapClarity = 'Please select your roadmap clarity';
    }

    if (!this.name) {
      errors.name = 'Please enter your name';
    }

    if (!this.email) {
      errors.email = 'Please enter your email';
    } else if (!this._validateEmail(this.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!this.jobTitle) {
      errors.jobTitle = 'Please enter your job title';
    }

    if (!this.companyName) {
      errors.companyName = 'Please enter your company name';
    }

    this.formErrors = errors;

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      // Calculate the total score
      this.totalScore = this._calculateTotalScore();

      // In a real application, you would send the data to a server here
      console.log('Form submitted:', {
        platform: this.platform,
        operationalSatisfaction: this.operationalSatisfaction,
        backlogEfficiency: this.backlogEfficiency,
        challenges: this.challenges,
        roadmapClarity: this.roadmapClarity,
        name: this.name,
        email: this.email,
        jobTitle: this.jobTitle,
        companyName: this.companyName,
        totalScore: this.totalScore
      });

      // Show success message and score
      this.formSubmitted = true;
      this.showScore = true;

      // Dispatch a custom event that can be listened to by the parent
      this.dispatchEvent(new CustomEvent('form-submitted', {
        detail: {
          platform: this.platform,
          operationalSatisfaction: this.operationalSatisfaction,
          backlogEfficiency: this.backlogEfficiency,
          challenges: this.challenges,
          roadmapClarity: this.roadmapClarity,
          name: this.name,
          email: this.email,
          jobTitle: this.jobTitle,
          companyName: this.companyName,
          totalScore: this.totalScore
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  async _handleRequestMeeting() {
    try {
      // Ensure we have a CSRF token before proceeding
      if (!this.csrfToken) {
        console.log('CSRF token not available, fetching now...');
        await this._fetchCsrfToken();

        // If still no token after fetching, abort
        if (!this.csrfToken) {
          throw new Error('Could not obtain CSRF token');
        }
      }

      // Prepare the data to send
      const formData = new FormData();
      formData.append('platform', this.platform);
      formData.append('operationalSatisfaction', this.operationalSatisfaction);
      formData.append('backlogEfficiency', this.backlogEfficiency);
      formData.append('challenges', JSON.stringify(this.challenges));
      formData.append('roadmapClarity', this.roadmapClarity);
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('jobTitle', this.jobTitle);
      formData.append('companyName', this.companyName);
      formData.append('totalScore', this.totalScore);
      formData.append('csrfToken', this.csrfToken);

      // Send the data to the server
      const response = await fetch('/FormHandler.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Log the response for debugging
      console.log('Meeting request sent successfully');

      // Update the UI to show that the meeting has been requested
      this.meetingRequested = true;

      // Dispatch a custom event that can be listened to by the parent
      this.dispatchEvent(new CustomEvent('meeting-requested', {
        detail: {
          name: this.name,
          email: this.email,
          jobTitle: this.jobTitle,
          companyName: this.companyName,
          totalScore: this.totalScore,
          csrfToken: this.csrfToken
        },
        bubbles: true,
        composed: true
      }));
    } catch (error) {
      console.error('Error sending meeting request:', error);
      // You could add error handling here, such as displaying an error message to the user
    }
  }

  _validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Get the appropriate color class based on the score
  _getScoreColorClass() {
    if (this.totalScore >= 8) {
      return 'score-value-green';
    } else if (this.totalScore >= 6) {
      return 'score-value-yellow';
    } else if (this.totalScore >= 4) {
      return 'score-value-amber';
    } else {
      return 'score-value-red';
    }
  }

  // Calculate the percentage position for the score marker on the slider
  _getScorePercentage() {
    // Convert score to percentage (0-10 to 0-100)
    // Higher scores should be on the green side (right)
    // Adjust the range to keep the marker away from the edges (5% to 95%)
    return 5 + (this.totalScore / 10) * 90;
  }
}

customElements.define('roi-calculator-form', RoiCalculatorForm);
